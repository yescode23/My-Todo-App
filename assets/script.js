// Navbar Responsive

const toggleHamburger = document.getElementById('hamburger-toggle');
const navMenu = document.querySelector('.navigation');
const iconHamburger = document.getElementById('hamburger-icon')

toggleHamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');

    if (navMenu.classList.contains('active')) {
        iconHamburger.classList.replace('bx-menu', 'bx-x');
    } else {
        iconHamburger.classList.replace('bx-x', 'bx-menu');
    }
})

// Navbar Responsive

// Dark Mode

const toggleDark = document.getElementById('dark-mode-toggle');
const bodyElement = document.body;
const themeKey = 'dark-mode-enable';

function enableDarkMode() {
    bodyElement.classList.add('dark-mode');
    toggleDark.innerHTML = '<i class="bx bx-sun"></i>';
    localStorage.setItem(themeKey, 'true');
}

function disableDarkMode() {
    bodyElement.classList.remove('dark-mode');
    toggleDark.innerHTML = '<i class="bx bx-moon"></i>';
    localStorage.setItem(themeKey, 'false');
}

if (localStorage.getItem(themeKey) === 'true') {
    enableDarkMode();
} else {
    disableDarkMode();
}

toggleDark.addEventListener('click', function() {
    if (bodyElement.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
})

// Dark Mode

// To Do List

// To Do List Global Variabel

const inputText = document.getElementById('input-list');
const addButton = document.getElementById('add-button');
const ul = document.getElementById('lists');
const ulComplete = document.getElementById('completed-lists');

// To Do List Global Variabel

// Add Button Function

addButton.addEventListener('click', function() {
    const valueText = inputText.value.trim();

    // Error Not Input List

    if (valueText === '') {
        const popupErrorContainer = document.querySelector('.popup-error-container');
        const popupOverlay = document.querySelector('.popup-overlay');

        popupErrorContainer.style.display = 'flex';
        popupOverlay.classList.add('show');

        setTimeout(() => {
            popupErrorContainer.classList.add('show');
        }, 10);

        return;
    }

    // To Do List

    const li = document.createElement('li');
    li.classList.add('list-items');
    ul.prepend(li);

    setTimeout(() => {
        li.classList.add('show');
    }, 10);

    let spanList = document.createElement('span');
    spanList.textContent = valueText;
    li.appendChild(spanList);

    const actionContainer = document.createElement('div');
    actionContainer.classList.add('action-container');
    li.appendChild(actionContainer);

    // Edit Button Container

    const editButtonContainer = document.createElement('div');
    editButtonContainer.classList.add('edit-button-container');
    actionContainer.appendChild(editButtonContainer);

    const editButton = document.createElement('button');
    editButton.classList.add('action-button');
    editButton.innerHTML = '<i class="bx bx-edit"></i>';
    editButtonContainer.appendChild(editButton);

    // Edit Button Function

    editButton.addEventListener('click', function() {
        editHandler(spanList);
    })

    // Checklist Button Container

    const checklistButtonContainer = document.createElement('div');
    checklistButtonContainer.classList.add('checklist-button-container');
    actionContainer.appendChild(checklistButtonContainer);

    const checklistButton = document.createElement('button');
    checklistButton.classList.add('action-button');
    checklistButton.innerHTML = '<i class="bx bx-check"></i>';
    checklistButtonContainer.appendChild(checklistButton);

    // Checkllst Button Function

    checklistButton.addEventListener('click', function() {
        checklistHandler(spanList, li);
    })

    inputText.value = '';

});

// Completed List

function createCompletedItem(spanList, li) {
    const liCompleted = document.createElement('li');
    liCompleted.classList.add('list-items');

    const spanCompleteList = document.createElement('span');
    spanCompleteList.style.textDecoration = 'line-through solid black 2px'
    spanCompleteList.textContent = spanList;
    liCompleted.appendChild(spanCompleteList);

    const completeActionContainer = document.createElement('div');
    completeActionContainer.classList.add('action-container');
    liCompleted.appendChild(completeActionContainer);

    // Restore Button

    const restoreButtonContainer = document.createElement('div');
    restoreButtonContainer.classList.add('restore-button-container');
    completeActionContainer.appendChild(restoreButtonContainer);

    const restoreButton = document.createElement('button');
    restoreButton.classList.add('action-button');
    restoreButton.innerHTML = '<i class="bx bx-recycle"></i>';
    restoreButtonContainer.appendChild(restoreButton);

    // Restore Button Function

    restoreButton.onclick = function() {
        liCompleted.classList.add('hide');

        setTimeout(() => {

            liCompleted.remove();

            ul.prepend(li);

            setTimeout(() => {
                li.classList.add('show');
                li.classList.remove('hide');
            }, 10);

            updateDeleteAllButton();

        }, 200);
    }

    // Delete Button

    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.classList.add('delete-button-container');
    completeActionContainer.appendChild(deleteButtonContainer);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('action-button');
    deleteButton.innerHTML = '<i class="bx bx-trash"></i>';
    deleteButtonContainer.appendChild(deleteButton);

    // Delete Button Function

    deleteButton.addEventListener('click', function() {
        liCompleted.classList.add('hide');

        setTimeout(() => {
            liCompleted.remove();
            updateDeleteAllButton();
        }, 200);

    });

    return liCompleted;

}

// Edit Handler Function

function editHandler(spanList) {
    const popupEditContainer = document.querySelector('.popup-edit-list-container');
    const popupOverlay = document.querySelector('.popup-overlay');
    const editInputText = document.getElementById('edit-input-list');
    const okEditButton = document.getElementById('ok-edit-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');

    popupEditContainer.style.display = 'flex';
    popupOverlay.classList.add('show');

    setTimeout(() => {
        popupEditContainer.classList.add('show');
    }, 10);


    okEditButton.onclick = function() {
        const editValueText = editInputText.value;
        spanList.textContent = editValueText;

        popupEditContainer.classList.remove('show');
        popupOverlay.classList.remove('show');

        setTimeout(() => {
            popupEditContainer.style.display = 'none';
        }, 20);

        editInputText.value = '';
    }

    cancelEditButton.onclick = function() {
        popupEditContainer.classList.remove('show');
        popupOverlay.classList.remove('show');

        setTimeout(() => {
            popupEditContainer.style.display = 'none';
        }, 20);
    }
}

// Checklist Handler Function

function checklistHandler(spanList, li) {

    li.classList.add('hide');

    setTimeout(() => {

        li.remove();

        const completedList = createCompletedItem(spanList.textContent, li);
        ulComplete.prepend(completedList);

        setTimeout(() => {
            completedList.classList.add('show');
        }, 10);

        updateDeleteAllButton();

    }, 200);
}

// Ok Error Button Function

function okErrorButton() {
    const popupErrorContainer = document.querySelector('.popup-error-container');
    const popupOverlay = document.querySelector('.popup-overlay');

    popupErrorContainer.classList.remove('show');
    popupOverlay.classList.remove('show');

    setTimeout(() => {
        popupErrorContainer.style.display = 'none';
    }, 20);
}

// Delete All Button Function

const deleteAllButton = document.getElementById('delete-all-button');

deleteAllButton.onclick = function() {
    const items = ulComplete.querySelectorAll('.list-items');

    items.forEach(item => {
        item.classList.add('hide');
    });

    setTimeout(() => {
        ulComplete.innerHTML = '';
        updateDeleteAllButton();
    }, 300);
}

// Update Delete All Button

function updateDeleteAllButton() {
    if (ulComplete.children.length === 0) {
        deleteAllButton.style.display = 'none';
    } else {
        deleteAllButton.style.display = 'block';
    }
}

// Example List Function

// First Example List Function

const firstExample = document.querySelector('.first-example');
const firstSpanExample = document.getElementById('first-span-example');
const firstEditBtn = document.getElementById('edit-button-example-1');
const firstChecklistBtn = document.getElementById('checklist-button-example-1');

firstEditBtn.addEventListener('click', function() {
    const popupEditContainer = document.querySelector('.popup-edit-list-container');
    const popupOverlay = document.querySelector('.popup-overlay');
    const editInputText = document.getElementById('edit-input-list');
    const okEditButton = document.getElementById('ok-edit-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');

    popupEditContainer.style.display = 'flex';
    popupOverlay.classList.add('show');

    setTimeout(() => {
        popupEditContainer.classList.add('show');
    }, 10);

    okEditButton.onclick = function() {
        const editValueText = editInputText.value;
        firstSpanExample.textContent = editValueText;

        popupEditContainer.classList.remove('show');
        popupOverlay.classList.remove('show');

        setTimeout(() => {
            popupEditContainer.style.display = 'none';
        }, 20);

        editInputText.value = '';
    }

    cancelEditButton.onclick = function() {
        popupEditContainer.classList.remove('show');
        popupOverlay.classList.remove('show');

        setTimeout(() => {
            popupEditContainer.style.display = 'none';
        }, 20);
    }

})

function firstExampelCompleted(firstSpanExample, firstExample) {
    const liCompleted = document.createElement('li');
    liCompleted.classList.add('list-items');

    const spanCompleteList = document.createElement('span');
    spanCompleteList.style.textDecoration = 'line-through solid black 2px'
    spanCompleteList.textContent = firstSpanExample;
    liCompleted.appendChild(spanCompleteList);

    const completeActionContainer = document.createElement('div');
    completeActionContainer.classList.add('action-container');
    liCompleted.appendChild(completeActionContainer);

    // Restore Button

    const restoreButtonContainer = document.createElement('div');
    restoreButtonContainer.classList.add('restore-button-container');
    completeActionContainer.appendChild(restoreButtonContainer);

    const restoreButton = document.createElement('button');
    restoreButton.classList.add('action-button');
    restoreButton.innerHTML = '<i class="bx bx-recycle"></i>';
    restoreButtonContainer.appendChild(restoreButton);

    // Restore Button Function

    restoreButton.onclick = function() {
        liCompleted.classList.add('hide');

        setTimeout(() => {

            liCompleted.remove();

            ul.prepend(firstExample);

            setTimeout(() => {
                firstExample.classList.add('show');
                firstExample.classList.remove('hide');
            }, 10);

            updateDeleteAllButton();

        }, 200);
    }

    // Delete Button

    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.classList.add('delete-button-container');
    completeActionContainer.appendChild(deleteButtonContainer);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('action-button');
    deleteButton.innerHTML = '<i class="bx bx-trash"></i>';
    deleteButtonContainer.appendChild(deleteButton);

    // Delete Button Function

    deleteButton.addEventListener('click', function() {
    liCompleted.classList.add('hide');

    setTimeout(() => {
        liCompleted.remove();
        updateDeleteAllButton();
    }, 200);

    });

    return liCompleted;
}

firstChecklistBtn.addEventListener('click', function() {
    firstExample.classList.add('hide');

    setTimeout(() => {

        firstExample.remove();

        const completedList = firstExampelCompleted(firstSpanExample.textContent, firstExample);

        ulComplete.prepend(completedList);

        setTimeout(() => {
            completedList.classList.add('show');
        }, 10);

        updateDeleteAllButton();

    }, 200);
})

// Second Example List Function

const secondExample = document.querySelector('.second-example');
const secondSpanExample = document.getElementById('second-span-example');
const secondEditBtn = document.getElementById('edit-button-example-2');
const secondChecklistBtn = document.getElementById('checklist-button-example-2');

secondEditBtn.addEventListener('click', function() {
    const popupEditContainer = document.querySelector('.popup-edit-list-container');
    const popupOverlay = document.querySelector('.popup-overlay');
    const editInputText = document.getElementById('edit-input-list');
    const okEditButton = document.getElementById('ok-edit-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');

    popupEditContainer.style.display = 'flex';
    popupOverlay.classList.add('show');

    setTimeout(() => {
        popupEditContainer.classList.add('show');
    }, 10);

    okEditButton.onclick = function() {
        const editValueText = editInputText.value;
        secondSpanExample.textContent = editValueText;

        popupEditContainer.classList.remove('show');
        popupOverlay.classList.remove('show');

        setTimeout(() => {
            popupEditContainer.style.display = 'none';
        }, 20);

        editInputText.value = '';
    }

    cancelEditButton.onclick = function() {
        popupEditContainer.classList.remove('show');
        popupOverlay.classList.remove('show');

        setTimeout(() => {
            popupEditContainer.style.display = 'none';
        }, 20);
    }

})

function secondExampelCompleted(secondSpanExample, secondExample) {
    const liCompleted = document.createElement('li');
    liCompleted.classList.add('list-items');

    const spanCompleteList = document.createElement('span');
    spanCompleteList.style.textDecoration = 'line-through solid black 2px'
    spanCompleteList.textContent = secondSpanExample;
    liCompleted.appendChild(spanCompleteList);

    const completeActionContainer = document.createElement('div');
    completeActionContainer.classList.add('action-container');
    liCompleted.appendChild(completeActionContainer);

    // Restore Button

    const restoreButtonContainer = document.createElement('div');
    restoreButtonContainer.classList.add('restore-button-container');
    completeActionContainer.appendChild(restoreButtonContainer);

    const restoreButton = document.createElement('button');
    restoreButton.classList.add('action-button');
    restoreButton.innerHTML = '<i class="bx bx-recycle"></i>';
    restoreButtonContainer.appendChild(restoreButton);

    // Restore Button Function

    restoreButton.onclick = function() {
        liCompleted.classList.add('hide');

        setTimeout(() => {

            liCompleted.remove();

            ul.prepend(secondExample);

            setTimeout(() => {
                secondExample.classList.add('show');
                secondExample.classList.remove('hide');
            }, 10);

            updateDeleteAllButton();

        }, 200);
    }

    // Delete Button

    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.classList.add('delete-button-container');
    completeActionContainer.appendChild(deleteButtonContainer);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('action-button');
    deleteButton.innerHTML = '<i class="bx bx-trash"></i>';
    deleteButtonContainer.appendChild(deleteButton);

    // Delete Button Function

    deleteButton.addEventListener('click', function() {
    liCompleted.classList.add('hide');

    setTimeout(() => {
        liCompleted.remove();
        updateDeleteAllButton();
    }, 200);

    });

    return liCompleted;
}

secondChecklistBtn.addEventListener('click', function() {
    secondExample.classList.add('hide');

    setTimeout(() => {

        secondExample.remove();

        const completedList = secondExampelCompleted(secondSpanExample.textContent, secondExample);

        ulComplete.prepend(completedList);

        setTimeout(() => {
            completedList.classList.add('show');
        }, 10);

        updateDeleteAllButton();

    }, 200);
})

// Second Example List Function

// Example List Function