$(document).ready(function() {
    // Loop to generate options from 1 to 30 For Nights
    const selectElement = $("#nights");
    for (let i = 1; i <= 30; i++) {
        // Create an option element and set its value and text
        const option = $("<option>", {
            value: i,
            text: i
        });
        selectElement.append(option);
    }

    // Create AutoComplete
    document.addEventListener('DOMContentLoaded', e => {
        $('#input-datalist').autocomplete()
    }, false);


    // This function will be executed whenever the date input value changes
    $('.dateInput').change(function() {
        console.log($(this).val())
        const startDate = $('#check-in').val();
        const endDate = $('#check-out').val();
        getDaysBetweenDates(startDate , endDate)
    });


    // Format Date To yyyy-MM-dd
    function formatDate(date) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-based, so we add 1
        const day = ('0' + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }

    // When Change Nights Calculate Dates
    $('#nights').change(function() {
        let startDate = $('#check-in').val();
        const endDate = $('#check-out').val();

        if(startDate){
            let d = new Date(startDate).getDate() + (+($(this).val()))						
            startDate = new Date(startDate).setDate(d)
            const d1 = new Date(startDate).toLocaleDateString('en-US')
            const parts = d1.split('/'); 
            const inputDate = new Date(parts[2], parts[0] - 1, parts[1]);
            const formattedDate = formatDate(inputDate);
            $('#check-out').val(formattedDate)
        }
    })


    // Get Days Between 2 Dates
    function getDaysBetweenDates(startDate, endDate) {
        if(startDate && endDate){
            var date1 = new Date(startDate);
            var date2 = new Date(endDate);
            var Difference_In_Time = date2.getTime() - date1.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            $('#nights').val(Difference_In_Days)
        }
    }

});