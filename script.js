document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    
    // Check if device supports hover
    const isHoverableDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isHoverableDevice && container) {
        document.addEventListener('mousemove', (e) => {
            // Restrict movement to a very subtle effect
            const xAxis = (window.innerWidth / 2 - e.pageX) / 80;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 80;
            
            container.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(0)`;
        });

        document.addEventListener('mouseleave', () => {
            container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
            container.style.transition = 'transform 0.5s ease';
        });
        
        document.addEventListener('mouseenter', () => {
            container.style.transition = 'none';
        });
    }

    // Add click ripple effect to links
    const links = document.querySelectorAll('.link-item');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            let rect = this.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Email copy to clipboard
    const copyEmailBtn = document.querySelector('.copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                const titleSpan = this.querySelector('.email-title');
                const originalText = titleSpan.innerText;
                titleSpan.innerText = 'Copied!';
                
                // Change icon to check
                const copyIcon = this.querySelector('.right-icon');
                copyIcon.classList.remove('fa-copy', 'fa-regular');
                copyIcon.classList.add('fa-check', 'fa-solid');
                
                setTimeout(() => {
                    titleSpan.innerText = originalText;
                    copyIcon.classList.remove('fa-check', 'fa-solid');
                    copyIcon.classList.add('fa-copy', 'fa-regular');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
});
