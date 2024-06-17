function submitApplication(e) {
    e.preventDefault(); 
    const jobs = document.getElementsByName('job')
    let job = null;
    let text = "";
    for (var i = 0; i < jobs.length; i++) {
        if (jobs[i].checked) {
            job = jobs[i];
            break;
        }
    }
    if (job) {
        text = "Thanks for applying to be a " + job.value;
    }
    else {
        text = "Please select a job to apply!"
    }
    document.getElementById("btn-apply").addEventListener("click", () => {
        alert(text);
    })
}