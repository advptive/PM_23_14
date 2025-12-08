const fullUserName = "Laura Anderson";

function setUserName() {
    const firstNameElement = document.querySelector('.header-section .first-name');
    const surnameElement = document.querySelector('.header-section .surname');
    
    if (firstNameElement && surnameElement) {
        const nameParts = fullUserName.split(' ');
        firstNameElement.textContent = nameParts[0] || '';
        surnameElement.textContent = nameParts.slice(1).join(' ') || '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setUserName();
});

const experienceItms = [
    {
        title: 'SENIOR',
        subtitle: 'WEB DEVELOPER',
        date: 'Jan 2013 - Dec 2015',
        company: 'Company Name | Location',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam .'
    },
    {
        title: 'MASTER',
        subtitle: 'WEB DEVELOPER',
        date: 'Mar 2010 - Feb 2012',
        company: 'Company Name | Location',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam .'
    },
    {
        title: 'JQUERY',
        subtitle: 'EXPERTISE',
        date: 'Apr 2008 - May 2010',
        company: 'Company Name | Location',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam .'
    }
]

function renderExperienceItems() {
    const experienceSection = document.querySelector('.experience-section');
    if (!experienceSection) return;

    experienceItms.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');

        const timelineMarker = document.createElement('div');
        timelineMarker.classList.add('timeline-marker');

        const timelineContent = document.createElement('div');
        timelineContent.classList.add('timeline-content');
        
        const jobHeader = document.createElement('div');
        jobHeader.classList.add('job-header');

        const jobTitle = document.createElement('div');
        jobTitle.classList.add('job-title');

        const jobTitleText = document.createElement('h3');
        jobTitleText.textContent = item.title;

        const jobSubtitle = document.createElement('h4');
        jobSubtitle.textContent = item.subtitle;

        const jobDate = document.createElement('p');
        jobDate.textContent = item.date;

        const companyInfo = document.createElement('div');
        companyInfo.classList.add('company-info');
        
        const companyName = document.createElement('h4');
        companyName.textContent = item.company;

        const companyDescription = document.createElement('p');
        companyDescription.textContent = item.description;

        jobTitle.appendChild(jobTitleText);
        jobTitle.appendChild(jobSubtitle);
        jobTitle.appendChild(jobDate);

        companyInfo.appendChild(companyName);
        companyInfo.appendChild(companyDescription);

        jobHeader.appendChild(jobTitle);
        jobHeader.appendChild(companyInfo);

        timelineContent.appendChild(jobHeader);

        timelineItem.appendChild(timelineMarker);
        timelineItem.appendChild(timelineContent);

        experienceSection.appendChild(timelineItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderExperienceItems();
});