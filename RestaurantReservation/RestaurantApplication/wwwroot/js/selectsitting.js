

$(() => {
    $("#datetime").change(() => {
        if ($("#datetime").val() !== "") {
            let start = new Date($("#datetime").val()).toISOString();
            fetch(`/Reservation/GetSittingsForDate?datetime=${start}`)
                .then(r => r.json())
                .then(sittings => {
                    $(`#sitting-options`).empty();
                    $(`#sitting-options`).append(`<option value="">-- select sitting --</option>`);

                    if (sittings && sittings.length > 0) {
                        for (let s of sittings) {
                            $(`#sitting-options`).append(`<option value="${s.id}" ${s.Vacancies === 0 ? 'disabled' : ''}>${s.displayText}</option>`);
                        }
                    } else {
                        // Handle the case when sittings data is null or empty
                        $(`#sitting-options`).append(`<option value="" disabled>No sittings available</option>`);
                    }
                })
                .catch(error => {
                    console.error("Error fetching sittings data:", error);
                    // Handle the error condition
                });
        } else {
            $(`#sitting-options`).empty();
        }
    });
});
