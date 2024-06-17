function filter_interests() {
	const container = document.getElementById('students');
	container.innerHTML = '';
	const interest = document.getElementById('search-interest').value;
	fetch('https://cs571.org/api/s24/hw2/students', {
		method: 'GET',
		headers: {
			'X-CS571-ID': CS571.getBadgerId()
		}
	})
	.then(res => res.json())
	.then(data => {
		filtered = data.filter(item => item.interests.includes(interest));
		buildStudents(filtered);
	})
	.catch(error => console.error(error)) // print errors
}

function buildStudents(studs) {
	const numStudents = document.getElementById('num-results');
    numStudents.innerText = studs.length;
    const container = document.getElementById('students');
    for (let student of studs) {
        const studentContainer = document.createElement('td');
        studentContainer.classList.add('student-container');
        // Create and append the student's name
        const studentName = document.createElement('h3');
        studentName.classList.add('student-name');
        studentName.innerText = student.name.first + ' ' + student.name.last;
        studentContainer.appendChild(studentName);

        // create and append the student's major
        const studentMajor = document.createElement('h6');
        studentMajor.classList.add('student-major');
        studentMajor.innerText = student.major;
        studentContainer.appendChild(studentMajor);

        // Create and append the student's name
        const studentCredits = document.createElement('p');
        studentCredits.classList.add('student-credits');
        if (student.fromWisconsin) {
            studentCredits.innerText = student.name.first + ' ' + student.name.last + ' is taking ' + student.numCredits + ' credits and is from Wisconsin.'
        } else {
            studentCredits.innerText = student.name.first + ' ' + student.name.last + ' is taking ' + student.numCredits + ' credits and is not from Wisconsin.'
        }
        studentContainer.appendChild(studentCredits);

        // Create and append number of interests
        const numInterests = document.createElement('p');
        numInterests.classList.add('num-interests');
        const interests = student.interests;
        numInterests.innerText = 'They have ' + interests.length + ' interests including...'
        studentContainer.appendChild(numInterests);

        // Create and append the list of interests
        const ul = document.createElement('ul');
        // Iterate through the items array and create li elements
        interests.forEach(interest => {
            const li = document.createElement('li');
            li.innerText = interest;
			li.addEventListener('click', function() {
				interestLabel = document.getElementById('search-interest');
				interestLabel.value = interest;
				filter_interests();
			});
			ul.appendChild(li);
        });
        studentContainer.appendChild(ul);
		container.appendChild(studentContainer);
	}

}


	
fetch('https://cs571.org/api/s24/hw2/students', {
	method: 'GET',
	headers: {
		'X-CS571-ID': CS571.getBadgerId()
	}
})
.then(res => res.json())
.then(data => {
	buildStudents(data);
	console.log(data); // for debugging
})
.catch(error => console.error(error)) 



// helper function to test if the strings can match
function containsSubstring(string, query) {
    return string.toLowerCase().includes(query.toLowerCase());
}

function handleSearch(e) {
	e?.preventDefault(); 
	const major = document.getElementById('search-major').value;
	const name = document.getElementById('search-name').value;
	const numStudents = document.getElementById('num-results');
    numStudents.innerText = '';
	const container = document.getElementById('students');
	container.innerHTML = '';
	fetch('https://cs571.org/api/s24/hw2/students', {
		method: 'GET',
		headers: {
			'X-CS571-ID': CS571.getBadgerId()
		}
	})
	.then(res => res.json())
	.then(data => {
		filtered = data.filter(item => containsSubstring(item.major, major) && containsSubstring(item.name.first + ' ' + item.name.last , name));
		buildStudents(filtered);
	})
	.catch(error => console.error(error)) 
}

document.getElementById('search-btn').addEventListener('click', handleSearch);

