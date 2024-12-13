// Initialisation du canvas Fabric.js
const canvas = new fabric.Canvas('collageCanvas', {
    backgroundColor: '#ffffff', // Fond blanc
});

// Fonction pour ajouter un cercle
function addCircle() {
    const circle = new fabric.Circle({
        radius: 50,
        fill: 'blue',
        top: 100,
        left: 100,
    });
    canvas.add(circle);
}

// Fonction pour ajouter un rectangle
function addRectangle() {
    const rectangle = new fabric.Rect({
        width: 100,
        height: 60,
        fill: 'green',
        top: 150,
        left: 150,
    });
    canvas.add(rectangle);
}

// Fonction pour ajouter du texte
function addText() {
    const text = new fabric.Text('Texte par défaut', {
        fontSize: 30,
        fill: 'red',
        top: 200,
        left: 200,
    });
    canvas.add(text);
}

// Fonction pour changer la couleur de l'objet sélectionné
function changeColor() {
    const colorPicker = document.getElementById('colorPicker');
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        activeObject.set('fill', colorPicker.value); // Change la couleur de remplissage
        canvas.renderAll(); // Met à jour le canvas
    } else {
        alert('Veuillez sélectionner un objet pour changer sa couleur.');
    }
}

// Fonction pour changer le texte de l'objet texte sélectionné
function changeText() {
    const textEditor = document.getElementById('textEditor');
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
        activeObject.set('text', textEditor.value); // Change le texte
        canvas.renderAll(); // Met à jour le canvas
    }
}

// Fonction pour effacer le canvas
function clearCanvas() {
    canvas.clear();
    canvas.setBackgroundColor('#ffffff'); // Réinitialiser le fond
    canvas.renderAll();
}

// Gestion des événements : Remplir les contrôles si un objet est sélectionné
canvas.on('selection:created', updateControls);
canvas.on('selection:updated', updateControls);

function updateControls() {
    const activeObject = canvas.getActiveObject();
    const colorPicker = document.getElementById('colorPicker');
    const textEditor = document.getElementById('textEditor');

    // Met à jour les valeurs des contrôles selon l'objet sélectionné
    if (activeObject) {
        if (activeObject.fill) {
            colorPicker.value = activeObject.fill; // Valeur actuelle de la couleur
        }
        if (activeObject.type === 'text') {
            textEditor.value = activeObject.text; // Valeur actuelle du texte
        } else {
            textEditor.value = ''; // Vide pour les objets non texte
        }
    }
}

// Fonction pour supprimer l'objet sélectionné
function deleteSelectedObject() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject); // Supprime l'objet du canvas
    } else {
        alert('Veuillez sélectionner un objet pour le supprimer.');
    }
}

// Ajout d'un événement clavier pour la suppression
document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject); // Supprime l'objet
        }
    }
});
