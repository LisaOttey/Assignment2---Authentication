/* File Name: Scripts/app.js by Lisa Hayles Ottey 301162155 - 02/13/2021*/
(function(){
    function Start()
    {
        console.log("app started...")
        
        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event) =>{
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/bcontacts')
                }
            });
        }
    }

    window.addEventListener("load", Start)

})();