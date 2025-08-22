// Project Collaboration Center JavaScript
console.log('Project Collaboration Center loading...');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project Collaboration Center ready!');
    initializeFilters();
    initializeModals();
});

// Quick Actions
function createNewProject() {
    console.log('Creating new project...');
    showModal('create-project-modal');
}

function showJoinProject() {
    console.log('Showing join project modal...');
    showModal('join-project-modal');
}

function showTemplates() {
    console.log('Showing templates...');
    const templatesSection = document.getElementById('templates-section');
    const projectsSection = document.querySelector('.my-projects');
    
    if (templatesSection.style.display === 'none') {
        templatesSection.style.display = 'block';
        templatesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        templatesSection.style.display = 'none';
    }
}

// Project Management
function openProject(projectId) {
    console.log('Opening project:', projectId);
    
    // Simulate opening project workspace
    alert(`Opening project workspace for: ${projectId}\n\nThis would typically open:\n• Shared documents\n• Design files\n• Collaboration tools\n• Version history\n• Team chat`);
    
    // In a real implementation, this would navigate to the project workspace
    // window.location.href = `project-workspace.html?id=${projectId}`;
}

function useTemplate(templateType) {
    console.log('Using template:', templateType);
    
    const templateNames = {
        'mobile-app': 'Mobile App Project',
        'web-platform': 'Web Platform Project',
        'product-launch': 'Product Launch Project',
        'data-analytics': 'Data & Analytics Project'
    };
    
    const templateName = templateNames[templateType] || 'Project Template';
    
    // Pre-fill the create project form with template data
    document.getElementById('project-name').value = `New ${templateName}`;
    document.getElementById('project-type').value = templateType;
    document.getElementById('project-description').value = `Project created from ${templateName} template`;
    
    // Show create project modal
    showModal('create-project-modal');
}

// Filter Management
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        const status = card.getAttribute('data-status');
        
        if (filter === 'all' || status === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal Management
function initializeModals() {
    // Initialize form submissions
    document.getElementById('create-project-form').addEventListener('submit', handleCreateProject);
    document.getElementById('join-project-form').addEventListener('submit', handleJoinProject);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
}

function showModal(modalId) {
    console.log('Showing modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    console.log('Closing modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Reset forms
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Form Handlers
function handleCreateProject(event) {
    event.preventDefault();
    console.log('Creating project...');
    
    const formData = new FormData(event.target);
    const projectData = {
        name: formData.get('projectName'),
        description: formData.get('projectDescription'),
        type: formData.get('projectType'),
        teamMembers: formData.get('teamMembers')
    };
    
    console.log('Project data:', projectData);
    
    // Simulate project creation
    createProjectWorkspace(projectData);
    
    // Close modal
    closeModal('create-project-modal');
}

function handleJoinProject(event) {
    event.preventDefault();
    console.log('Joining project...');
    
    const formData = new FormData(event.target);
    const invitationCode = formData.get('invitationCode');
    
    console.log('Invitation code:', invitationCode);
    
    // Simulate joining project
    joinProjectWorkspace(invitationCode);
    
    // Close modal
    closeModal('join-project-modal');
}

function createProjectWorkspace(projectData) {
    // Simulate project creation process
    const loadingSteps = [
        'Creating project workspace...',
        'Setting up collaboration tools...',
        'Initializing document templates...',
        'Inviting team members...',
        'Project created successfully!'
    ];
    
    let currentStep = 0;
    const showStep = () => {
        if (currentStep < loadingSteps.length) {
            console.log(loadingSteps[currentStep]);
            currentStep++;
            setTimeout(showStep, 800);
        } else {
            // Add new project to the grid
            addProjectToGrid(projectData);
            alert(`Project "${projectData.name}" created successfully!\n\nYour collaboration workspace is ready with:\n• Document templates\n• Team chat\n• Version control\n• File sharing\n• Real-time editing`);
        }
    };
    
    showStep();
}

function joinProjectWorkspace(invitationCode) {
    // Simulate joining process
    const mockProjects = {
        'ABC123': 'Mobile App Redesign',
        'XYZ789': 'API Documentation v2.0',
        'DEF456': 'Q4 Marketing Campaign'
    };
    
    const projectName = mockProjects[invitationCode.toUpperCase()];
    
    if (projectName) {
        setTimeout(() => {
            alert(`Successfully joined "${projectName}"!\n\nYou now have access to:\n• All project documents\n• Team discussions\n• Design files\n• Collaboration tools`);
            
            // Refresh the page to show the new project
            location.reload();
        }, 1000);
    } else {
        alert('Invalid invitation code. Please check with your team lead and try again.');
    }
}

function addProjectToGrid(projectData) {
    const projectsGrid = document.getElementById('projects-grid');
    const newProjectCard = document.createElement('div');
    newProjectCard.className = 'project-card';
    newProjectCard.setAttribute('data-status', 'active');
    
    const projectId = projectData.name.toLowerCase().replace(/\s+/g, '-');
    
    newProjectCard.innerHTML = `
        <div class="project-header">
            <h3>${projectData.name}</h3>
            <span class="project-status active">Active</span>
        </div>
        <p class="project-description">${projectData.description || 'No description provided'}</p>
        <div class="project-meta">
            <div class="collaborators">
                <img src="https://via.placeholder.com/24" alt="User" class="avatar">
                <span class="more-count">You</span>
            </div>
            <span class="last-updated">Created just now</span>
        </div>
        <div class="project-artifacts">
            <div class="artifact-count">
                <span class="artifact-icon">📄</span>
                <span>0 Documents</span>
            </div>
            <div class="artifact-count">
                <span class="artifact-icon">🎨</span>
                <span>0 Designs</span>
            </div>
            <div class="artifact-count">
                <span class="artifact-icon">💬</span>
                <span>0 Comments</span>
            </div>
        </div>
        <button class="project-button" onclick="openProject('${projectId}')">Open Project</button>
    `;
    
    // Add animation
    newProjectCard.style.opacity = '0';
    newProjectCard.style.transform = 'translateY(20px)';
    
    projectsGrid.insertBefore(newProjectCard, projectsGrid.firstChild);
    
    // Animate in
    setTimeout(() => {
        newProjectCard.style.transition = 'all 0.5s ease';
        newProjectCard.style.opacity = '1';
        newProjectCard.style.transform = 'translateY(0)';
    }, 100);
}

// Utility Functions
function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 1) {
        return 'Updated just now';
    } else if (hours < 24) {
        return `Updated ${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 7) {
        return `Updated ${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        return `Updated ${date.toLocaleDateString()}`;
    }
}

// Add CSS animation for fade in effect
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('Project Collaboration Center JavaScript loaded successfully!');
