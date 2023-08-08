document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
  
    // Function to handle option click
    const handleOptionClick = (event) => {
      const clickedOption = event.target.textContent;
      dropdownBtn.textContent = clickedOption;
      // No need to hide the dropdown content here
    };
  
    // Event listener for option clicks
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
      option.addEventListener('click', handleOptionClick);
    });
  });
  