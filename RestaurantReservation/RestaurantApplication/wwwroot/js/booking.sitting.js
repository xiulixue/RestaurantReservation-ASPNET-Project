$(() => {

	$('#datepicker').datepicker({
		format: 'yyyy-mm-dd',
		startDate: new Date(),
		autoclose: true
	});

	//$('#datepicker').datepicker('setDate', moment().format('YYYY-MM-DD'));

	$('#datepicker').on('changeDate', e => {
		fetch(`/Reservation/GetSittings?dateTime=${new Date(e.date).toISOString()}`)
			.then(response => response.json())
			.then(sittings => {
				$('#sittings-container').empty();

				for (let s of sittings) {
					
						$('#sittings-container').append(
							`<a href="/Reservation/Create/${s.id}" class="form-control">
								<p> ${s.type}: ${s.startTime} - ${s.endTime}</p>
								
							</a>`
							);
					
				}
			})
			.catch(e => {

				$('#sittings-container').append(
					'<p>Sorry no sittings available in the selected date</p>'
				);

			});

	});
}); 