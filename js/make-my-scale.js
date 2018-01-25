/**
 * make-my-scale.js
 * 
 * Simple web application for guitar players to clearly see scales in the fretboard.
 * 
 * @author Marcos G. Valderrey
 */
var MMS = MMS || {};

// Context properties
MMS.canvas = document.getElementById("mms-canvas");
MMS.ctx = MMS.canvas.getContext("2d");
MMS.logElement = document.getElementById("mms-console");

// Colors
MMS.color = {
	gray1: "#1a1a1a",
	gray2: "#4d4d4d",
	gray3: "#999999",
	gray4: "#cccccc",
	red1: "#c02942",
	red2: "#ac253b",
	orange1: "#d95b43",
	orange2: "#c3523c"
};

// Configuration
MMS.language = 'en';
MMS.halfstep = 1.059463094;
MMS.showNoteNames = true;

// Neck
MMS.neck = {};

// Frets
MMS.fretsCount = 21;
MMS.frets = [];

// Marks
MMS.marks = [];

// Strings
MMS.stringsCount = 6;
MMS.strings = [];

// Fingers
MMS.fingers = [];

// Notes
MMS.notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
MMS.selectedNotes = [];

// Scales
MMS.scale = {};

// Diatonic scales
MMS.scale.major = [0, 2, 4, 5, 7, 9, 11];
MMS.scale.minor = [0, 2, 3, 5, 7, 8, 10];
MMS.scale.harmonicMinor = [0, 2, 3, 5, 7, 8, 11];
MMS.scale.melodicMinor = [0, 2, 3, 5, 7, 9, 11];

// Modes
MMS.scale.ionian = [0, 2, 4, 5, 7, 9, 11];
MMS.scale.dorian = [0, 2, 3, 5, 7, 9, 10];
MMS.scale.phrygian = [0, 1, 3, 5, 7, 8, 10];
MMS.scale.lydian = [0, 2, 4, 6, 7, 9, 11];
MMS.scale.minorLydian = [0, 2, 4, 6, 7, 8, 10];
MMS.scale.diminishedLydian = [0, 2, 3, 6, 7, 9, 11];
MMS.scale.augmentedLydian = [0, 2, 4, 6, 8, 9, 11];
MMS.scale.mixolydian = [0, 2, 4, 5, 7, 9, 10];
MMS.scale.aeolian = [0, 2, 3, 5, 7, 8, 10];
MMS.scale.locrian = [0, 1, 3, 5, 6, 8, 10];
MMS.scale.majorLocrian = [0, 2, 4, 5, 6, 8, 10];
MMS.scale.superLocrian = [0, 1, 3, 4, 6, 8, 10];

// Symmetric scales
MMS.scale.chromatic = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
MMS.scale.wholeTone = [0, 2, 4, 6, 8, 10];
MMS.scale.diminishedWholeHalf = [0, 2, 3, 5, 6, 8, 9, 11];
MMS.scale.diminishedHalfWhole = [0, 1, 3, 4, 6, 7, 9, 10];
MMS.scale.augmented = [0, 3, 4, 7, 8, 11];
MMS.scale.sixTone = [0, 1, 4, 5, 8, 9];

// Blues scales
MMS.scale.minorPentatonic = [0, 3, 5, 7, 10];
MMS.scale.minorBluesPentatonic = [0, 3, 5, 6, 7, 10];
MMS.scale.majorPentatonic = [0, 2, 4, 7, 9];
MMS.scale.majorBluesPentatonic = [0, 2, 3, 4, 7, 9];
MMS.scale.dominantPentatonic = [0, 2, 4, 7, 10];

// Jazz scales
MMS.scale.majorBebop = [0, 2, 4, 5, 7, 8, 9, 11];
MMS.scale.minorBebop = [0, 2, 3, 4, 5, 7, 9, 10];
MMS.scale.dominantBebop = [0, 2, 4, 5, 7, 9, 10, 11];
MMS.scale.halfDiminishedBebop = [0, 1, 3, 5, 6, 7, 8, 11];

// Exotic scales
MMS.scale.altered = [0, 1, 3, 4, 6, 7, 8, 10];
MMS.scale.algerian = [0, 2, 3, 5, 6, 7, 8, 11];
MMS.scale.arabianA = [0, 2, 3, 5, 6, 8, 9, 11];
MMS.scale.arabianB = [0, 2, 4, 5, 6, 8, 10];
MMS.scale.balinese = [0, 1, 3, 7, 8];
MMS.scale.byzantine = [0, 1, 4, 5, 7, 8, 11];
MMS.scale.chinese = [0, 4, 6, 7, 11];
MMS.scale.egyptian = [0, 2, 5, 7, 10];
MMS.scale.enigmatic = [0, 1, 4, 6, 8, 10, 11];
MMS.scale.hindu = [0, 2, 4, 5, 7, 8, 10];
MMS.scale.majorHungarian = [0, 3, 4, 6, 7, 9, 10];
MMS.scale.minorHungarian = [0, 2, 3, 6, 7, 8, 11];
MMS.scale.japanese = [0, 1, 5, 7, 8];
MMS.scale.javaneese = [0, 1, 3, 5, 7, 9, 10];
MMS.scale.kumoi = [0, 2, 3, 7, 9];
MMS.scale.mongolian = [0, 2, 4, 7, 9];
MMS.scale.neapolitan = [0, 1, 3, 5, 7, 8, 11];
MMS.scale.majorNeapolitan = [0, 1, 3, 5, 7, 9, 11];
MMS.scale.minorNeapolitan = [0, 1, 3, 5, 7, 8, 10];
MMS.scale.pelog = [0, 1, 3, 7, 8];
MMS.scale.persian = [0, 1, 4, 5, 6, 8, 11];
MMS.scale.prometheus = [0, 2, 4, 6, 9, 10];
MMS.scale.minorRoumanian = [0, 2, 3, 6, 7, 9, 10];

/**
 * Neck
 */
MMS.Neck = function() {
	
	// Rendering properties
	this.x = 25.0;
	this.y = 25.0;
	this.width = 850.0;
	this.height = 100.0;
	this.color = MMS.color.gray1;

	// Specific properties
	this.guitarScale = this.width / ( 1.0 - 1.0 / (Math.pow(MMS.halfstep, MMS.fretsCount)));
	
	// Render method
	this.draw = function() {
		MMS.ctx.fillStyle = this.color;
		MMS.ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	
};

/**
 * Fret
 */
MMS.Fret = function(x) {
	
	// Rendering properties
	this.x = x;
	this.y = MMS.neck.y;
	this.width = 4.0;
	this.height = MMS.neck.height;
	this.color = MMS.color.gray3;
	
	// Render method
	this.draw = function() {
		MMS.ctx.fillStyle = this.color;
		MMS.ctx.fillRect(this.x - this.width * 0.5, this.y, this.width, this.height);
	};
	
};

/**
 * Marks
 */
MMS.Mark = function(x, y) {
	
	// Rendering properties
	this.x = x;
	this.y = MMS.neck.y + y;
	this.radius = 6.0;
	this.color = MMS.color.gray3;
	
	// Render method
	this.draw = function() {
		MMS.ctx.fillStyle = this.color;
		MMS.ctx.beginPath();
		MMS.ctx.arc(this.x, this.y, this.radius, 0.0, 2 * Math.PI, false);
		MMS.ctx.fill();
	};
	
};

/**
 * String
 */
MMS.String = function(number, note) {
	
	// Specific properties
	this.number = number;
	this.note = note;
	
	// Rendering properties
	this.x = MMS.neck.x;
	this.y = MMS.neck.y;
	this.width = MMS.neck.width;
	this.height = 3.0;
	this.color = MMS.color.gray2;
	
	// Render method
	this.draw = function() {
		MMS.ctx.fillStyle = this.color;
		MMS.ctx.fillRect(this.x, this.y - this.height * 0.5, this.width, this.height);
	};
	
};

/**
 * Finger
 */
MMS.Finger = function() {
	
	// Specific properties
	this.note = null;
	this.isRoot = false;
	
	// Rendering properties
	this.radius = 6.0;
	this.x = 0.0;
	this.y = 0.0;
	this.color = MMS.color.red1;
	this.isVisible = false;
	
	// Clear method
	this.clear = function() {
		this.isRoot = false;
		this.color = MMS.color.red1;
		this.isVisible = false;
	};
	
	// Render method
	this.draw = function() {
		if(!this.isVisible) { return; }
		
		MMS.ctx.fillStyle = this.isRoot ? MMS.color.red1 : MMS.color.orange1;
		MMS.ctx.beginPath();
		MMS.ctx.arc(this.x, this.y, this.radius, 0.0, 2 * Math.PI, false);
		MMS.ctx.fill();
		
		if(MMS.showNoteNames) {
			MMS.ctx.fillStyle = "#cccccc";
			MMS.ctx.font = "bold 16px 'Arial'";
			MMS.ctx.textAlign = "center";
			MMS.ctx.fillText(MMS.notes[this.note], this.x, this.y + 6.0);
		}
		
	};
	
};

/**
 * Get the distance from the nut to a given fret number
 * 
 * d  = L - ( L / (ST ^ N))
 * 
 * L  = Guitar scale length
 * ST = Twelfth root of two
 * N  = Amount of frets
 * 
 * @param fretNumber
 * @returns
 */
MMS.getFretDistance = function(fretNumber) {
	var guitarScale = MMS.neck.guitarScale;
	var distance = MMS.neck.x + guitarScale - (guitarScale / Math.pow(MMS.halfstep, fretNumber));
	return distance;
};

/**
 * Get the position between two frets
 * 
 * @param fretNumber
 * @returns
 */
MMS.getFretPosition = function(fretNumber) {
	if(fretNumber<=0) {
		return MMS.neck.x;
	} else {
		var fret1 = MMS.frets[fretNumber-1];
		var fret2 = MMS.frets[fretNumber];
		return fret1.x + (fret2.x - fret1.x) * 0.5;
	}
};

/**
 * Get the position in Y coordinate of a given string
 * 
 * @param stringNumber
 * @returns
 */
MMS.getStringPosition = function(stringNumber) {
	return MMS.strings[stringNumber].y;
};

/**
 * Get the name of a note by it's index
 * 
 * @param noteIndex
 * @returns
 */
MMS.getNoteName = function(noteIndex) {
	return MMS.notes[noteIndex % MMS.notes.length];
};

/**
 * Select all the appearances of a note in the fretboard
 * 
 * @param noteIndex
 */
MMS.selectNote = function(noteIndex) {
	
	// Vefify for valid note
	if(noteIndex<0 || noteIndex>MMS.notes.length) { return; }
	
	// Determines the current visibility
	var order = MMS.selectedNotes.indexOf(noteIndex);
	if(order<0) {
		order = MMS.selectedNotes.push(noteIndex) - 1;
	} else {
		MMS.selectedNotes.splice(order, 1);
		order = -1;
	}
	
	// Selects all the corresponding notes
	for(var i = 0; i < MMS.stringsCount; i++) {
		for(var j = 0; j <= MMS.fretsCount; j++) {
			var finger = MMS.fingers[i][j];
			if(MMS.selectedNotes.length>0) {
				finger.isRoot = finger.note == MMS.selectedNotes[0];
			}
			
			if(finger.note==noteIndex) {
				finger.isVisible = order >= 0;
			}
		}
	}
	
	// Sort selected notes from root to last
	// MMS.selectedNotes.sort(function(a, b) { return a - b; });
	
	// Log the array of selected notes
	var notesLog = "";
	for(var i = 0; i < MMS.selectedNotes.length; i++) {
		notesLog += " " + MMS.getNoteName(MMS.selectedNotes[i]);
	}
	MMS.log(notesLog, 0);
	
	// Mark all the scales which contains the selected notes
	if(MMS.selectedNotes.length>0) {
		for(scaleName in MMS.scale) {
			var rootNote = MMS.selectedNotes[0];
			var simulatedScale = [];
			
			for(var i = 0; i < MMS.scale[scaleName].length; i++) {
				simulatedScale.push((rootNote + MMS.scale[scaleName][i]) % 12);
			}
			
			var isSameScale = true;
			for(var i = 0; i < simulatedScale.length; i++) {
				if(MMS.selectedNotes.indexOf(simulatedScale[i])==-1) {
					isSameScale = false;
					break;
				}
			}
			
			var scaleElement = document.getElementById(scaleName + "Scale");
			if(scaleElement!=null) {
				if(isSameScale) {
					scaleElement.className = "mms-button mms-button-selected-1";
				} else {
					scaleElement.className = "mms-button";
				}
			}
		}
		
	}
	
	MMS.draw();
};

/**
 * Select a particular scale
 * 
 * @param scaleName
 */
MMS.selectScale = function(scaleName) {
	if(MMS.selectedNotes.length<=0) {
		MMS.log(MMS.language=='en' ? "Select at least one note first" : "Seleccione al menos una nota primero", 0);
		return; 
	}
	
	var rootNote = MMS.selectedNotes[0];
	
	MMS.clear();
	
	// Selects every note of the given scale (defined as MMS.scale.scaleName)
	for(var i = 0; i < MMS.scale[scaleName].length; i++) {
		MMS.selectNote((rootNote + MMS.scale[scaleName][i]) % 12);
	}
	
	MMS.draw();
};


MMS.zoomIn = function() {
	MMS.ctx.scale(1.5, 1.5);
	MMS.draw();
};

MMS.zoomOut = function() {
	MMS.ctx.scale(0.5, 0.5);
	MMS.draw();
};

/**
 * Toggle note names option
 */
MMS.toggleNoteNames = function() {
	var button = document.getElementById("mms-note-names");
	MMS.showNoteNames = !MMS.showNoteNames;
	button.className = MMS.showNoteNames ? "mms-button mms-button-selected-1" : "mms-button";
	
	MMS.draw();
};

/**
 * Clear all
 */
MMS.clear = function() {
	MMS.selectedNotes = [];
	
	// Deselect fingers
	for(var i = 0; i < MMS.strings.length; i++) {
		for(var j = 0; j < MMS.frets.length; j++) {
			if(MMS.fingers[i][j]) {
				MMS.fingers[i][j].clear();
			}
		}
	}
	
	// Deselect scales
	for(scaleName in MMS.scale) {
		var scaleElement = document.getElementById(scaleName + "Scale");
		if(scaleElement!=null) {
			scaleElement.className = "mms-button";
		}
	}
	
	MMS.log("...");
	
	MMS.draw();
};

/**
 * Draw all
 */
MMS.draw = function() {
	//MMS.ctx.fillStyle = MMS.color.gray4;
	//MMS.ctx.fillRect(0.0, 0.0, MMS.canvas.width, MMS.canvas.height);
	MMS.ctx.clearRect(0.0, 0.0, MMS.canvas.width, MMS.canvas.height);
	
	// Neck
	MMS.ctx.shadowColor = "#999999";
	MMS.ctx.shadowColor = "#666666";
	MMS.ctx.shadowBlur = 15;
	
	MMS.neck.draw();
	
	// Frets
	for(var i = 0; i < MMS.frets.length; i++) {
		MMS.frets[i].draw();
	}
	
	// Marks
	for(var i = 0; i < MMS.marks.length; i++) {
		MMS.marks[i].draw();
	}
	
	// Strings
	for(var i = 0; i < MMS.strings.length; i++) {
		MMS.strings[i].draw();
	}
	
	// Fingers
	for(var i = 0; i < MMS.strings.length; i++) {
		for(var j = 0; j < MMS.frets.length; j++) {
			if(MMS.fingers[i][j]) {
				MMS.fingers[i][j].draw();
			}
		}
	}
	
	// Selected notes
	var notes = document.getElementById("mms-notes").getElementsByTagName("li");
	for(var i = 0; i < notes.length; i++) {
		var selectedIndex = MMS.selectedNotes.indexOf(i);
		if(selectedIndex==-1) {
			notes[i].className = "mms-button";
		} else if(selectedIndex==0) {
			notes[i].className = "mms-button mms-button-selected-1";
		} else if(selectedIndex>0) {
			notes[i].className = "mms-button mms-button-selected-2";
		}
	}
	
};

/**
 * Log
 * 
 * @param message
 * @param level
 */
MMS.log = function(message, level) {
	if(message==null || (message!=null && message.length<1)) {
		message = "...";
	}
	MMS.logElement.innerHTML = message;
};

/**
 * Show only the phrases of the given language
 * ('en' and 'es' implemented)
 * 
 * @param language
 */
MMS.translate = function(language) {
	MMS.language = language;
	
	var spans = document.querySelectorAll("span[lang]");
	for(var i = 0; i < spans.length; i++) {
		if(spans[i].lang==language) {
			spans[i].style.display = "block";
		} else {
			spans[i].style.display = "none";
		}
	}
	
	// Update buttons for language selection
	var langEnButton = document.getElementById("lang-en");
	langEnButton.className = language=="en" ? "mms-button mms-button-selected-1" : "mms-button";
	var langEsButton = document.getElementById("lang-es");
	langEsButton.className = language=="es" ? "mms-button mms-button-selected-1" : "mms-button";
	
	// Update document's title
	document.title = language=="en" ? "Make My Scale" : "Crea Mi Escala";
	
	// Update tooltips
	var noteNamesTooltip = document.getElementById("mms-note-names");
	noteNamesTooltip.title = language=="en" ? "Show/Hide note names" : "Mostrar/Ocultar nombres de notas";
	var resetTooltip = document.getElementById("mms-reset");
	resetTooltip.title = language=="en" ? "Delete current selection" : "Borrar selección actual";
	
};

/**
 * Initializer
 */
MMS.init = (function() {
	
	// Show note names
	var button = document.getElementById("mms-note-names");
	button.className = MMS.showNoteNames ? "mms-button mms-button-selected-1" : "mms-button";
	
	// Neck
	MMS.neck = new MMS.Neck();
	
	// Frets
	for(var i = 0; i <= MMS.fretsCount; i++) {
		var fretX = MMS.getFretDistance(i);
		var fret = new MMS.Fret(fretX);
		MMS.frets.push(fret);
	}
	
	// Marks
	for(var i = 0; i <= MMS.fretsCount; i++) {
		if((i % 12)==2 || (i % 12)==4 || (i % 12)== 6 || (i % 12)== 8) {
			var mark = new MMS.Mark(MMS.getFretPosition(i+1), MMS.neck.height * 0.5);
			MMS.marks.push(mark);
		}
		if(i > 0 && (i % 12) == 0) {
			var topMark = new MMS.Mark(MMS.getFretPosition(i), MMS.neck.height * 0.15);
			MMS.marks.push(topMark);
			var bottomMark = new MMS.Mark(MMS.getFretPosition(i), MMS.neck.height * 0.85);
			MMS.marks.push(bottomMark);
		}
	}
	
	// Strings
	var spaceBetween = MMS.neck.height / 6.0;
	var string1 = new MMS.String(0, 7);
	string1.y = MMS.neck.y + spaceBetween * 0.5;
	MMS.strings.push(string1);
	var string2 = new MMS.String(1, 2);
	string2.y = string1.y + spaceBetween;
	MMS.strings.push(string2);
	var string3 = new MMS.String(2, 10);
	string3.y = string2.y + spaceBetween;
	MMS.strings.push(string3);
	var string4 = new MMS.String(3, 5);
	string4.y = string3.y + spaceBetween;
	MMS.strings.push(string4);
	var string5 = new MMS.String(4, 0);
	string5.y = string4.y + spaceBetween;
	MMS.strings.push(string5);
	var string6 = new MMS.String(5, 7);
	string6.y = string5.y + spaceBetween;
	MMS.strings.push(string6);
	
	// Fingers
	for(var i = 0; i < MMS.stringsCount; i++) {
		MMS.fingers[i] = [];
		
		for(var j = 0; j <= MMS.fretsCount; j++) {
			var finger = new MMS.Finger();
			finger.note = (MMS.strings[i].note + j) % MMS.notes.length;
			finger.x = MMS.getFretPosition(j);
			finger.y = MMS.getStringPosition(i);
			MMS.fingers[i][j] = finger;
		}
	}
	
	// Default language is English
	MMS.translate('en');
	
	MMS.draw();
})();

