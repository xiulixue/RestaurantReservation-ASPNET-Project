using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Areas.Administration;
using RestaurantApplication.Core.Repositories;
using RestaurantApplication.Data;

using RestaurantApplication.Models;
using RestaurantApplication.Models.Staff;
using RestaurantApplication.Services;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Xml.Linq;

namespace RestaurantApplication.Areas.Administration.Controllers
{
    [Authorize(Roles = "Manager")]
    public class StaffController : AdministrationController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly SignInManager<IdentityUser> _signInManager;

        public StaffController(ApplicationDbContext context, IUnitOfWork unitOfWork, SignInManager<IdentityUser> signInManager) : base(context)
        {
            _unitOfWork = unitOfWork;
            _signInManager = signInManager;
        }

        public async Task<IActionResult> Index()
        {
            var usersWithRoles = (from user in _context.Users
                                  select new
                                  {
                                      UserId = user.Id,
                                      Username = user.UserName,
                                      Email = user.Email,
                                      RoleName = (from userRole in _context.UserRoles
                                                  join role in _context.Roles
                                                  on userRole.RoleId equals role.Id
                                                  where (userRole.UserId == user.Id)
                                                  select role.Name).ToList()
                                  })
                                  .ToList()
                                  .Select(p => new UserRolesVM()
                                  {
                                      UserId = p.UserId,
                                      Username = p.Username,
                                      Email = p.Email,
                                      Role = string.Join(",", p.RoleName)
                                  })
                                  .OrderBy(r => r.Role);
            return View(usersWithRoles);
        }

        public async Task<IActionResult> Edit(string id)
        {
            var user = _unitOfWork.User.GetUser(id);
            var roles = _unitOfWork.Role.GetRoles();

            var userRoles = await _signInManager.UserManager.GetRolesAsync(user);

            var roleItems = roles.Select(role =>
                new SelectListItem(
                    role.Name,
                    role.Id,
                    userRoles.Any(ur => ur.Contains(role.Name)))).ToList();

            var vm = new EditUserVM
            {
                User = user,
                Roles = roleItems
            };

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> OnPostAsync(EditUserVM data)
        {
            var user = _unitOfWork.User.GetUser(data.User.Id);
            if (user == null)
            {
                return NotFound();
            }

            var userRolesInDb = await _signInManager.UserManager.GetRolesAsync(user);

            var rolesToAdd = new List<string>();
            var rolesToDelete = new List<string>();

            foreach (var role in data.Roles)
            {
                var assignedInDb = userRolesInDb.FirstOrDefault(ur => ur == role.Text);
                if (role.Selected)
                {
                    if (assignedInDb == null)
                    {
                        rolesToAdd.Add(role.Text);
                    }
                }
                else
                {
                    if (assignedInDb != null)
                    {
                        rolesToDelete.Add(role.Text);
                    }
                }
            }

            if (rolesToAdd.Any())
            {
                await _signInManager.UserManager.AddToRolesAsync(user, rolesToAdd);
            }

            if (rolesToDelete.Any())
            {
                await _signInManager.UserManager.RemoveFromRolesAsync(user, rolesToDelete);
            }

            user.UserName = data.User.UserName;
            user.Email = data.User.Email;

            _unitOfWork.User.UpdateUser(user);

            return RedirectToAction("Edit", new { id = user.Id });
        }

        public IActionResult Create()
        {
            var role = _context.Roles.ToList();
            var set = new Create()
            {
                Roles = new SelectList(_context.Roles, "Name", "Name"),
                Role = "Staff",
            };

            return View(set);
        }
        [HttpPost]
        public async Task<IActionResult> Create(Create u)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var check = await _signInManager.UserManager.FindByEmailAsync(u.Email);
                    if (check == null)
                    {
                        var user = new IdentityUser()
                        {
                            UserName = u.Email,
                            Email = u.Email,
                            EmailConfirmed = true,
                        };
                        var result = await _signInManager.UserManager.CreateAsync(user, u.Password);
                        if (result.Succeeded)
                        {
                            await _signInManager.UserManager.AddToRoleAsync(user, u.Role);
                            var createdUser = _context.Users.First(r => r.Email == u.Email);
                            return RedirectToAction("Edit", new { Id = createdUser.Id});
                        }
                        else
                        {
                            foreach (var error in result.Errors)
                            {
                                ModelState.AddModelError(string.Empty, error.Description);
                            }
                        }
                    }
                    else
                    {
                        ModelState.AddModelError("Email", "Email address is already taken.");
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("Exception", ex.Message);
                }
            }
            u.Roles = new SelectList(_context.Roles.ToList(), "Id", "Name");

            return View(u);
        }

    }
}
