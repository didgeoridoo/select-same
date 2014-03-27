#target photoshop

// Set units to PIXELS
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeUnits = TypeUnits.PIXELS

// Use the top-most document
var doc = app.activeDocument; 

function activePathIndex(){// returns -1 if no path active/selective
   try{
      var ref = new ActionReference();
      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
      var desc = executeActionGet( ref );
      return  desc.getInteger(charIDToTypeID("TrgP" ));
   }catch(e){}
};

var wPath = doc.pathItems[activePathIndex()];

var coords = new File("~/Desktop/coords.txt");
coords.open("w");

var stride = 1; // 2 means every 2nd, 3 means every 3rd, etc. Minimum 1

// Loop through all path points and add their anchor coordinates to the output text
for (var i=0; i<wPath.subPathItems[0].pathPoints.length; i++) {
	if (i % stride === 0) {
		coords.writeln(wPath.subPathItems[0].pathPoints[i].anchor);
	}
}

// this returns an array of ABSOLUTE points. You need to get their relative positions from the starting point.

// then maybe do something like rotating through the delivered array so you create a path from any potential starting point

// then probably check all other paths for the # of sides (this is much cheaper than doing the full check)

// THEN you can check paths for congruency to at least one of the sets of points you have in your selected path object


coords.close();

// Alert the output text
//alert(coords);
