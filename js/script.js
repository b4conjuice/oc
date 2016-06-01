document.ontouchmove = function(e){ 
	    e.preventDefault(); 
	}

	var board = [
	  [null, null, null, null, null, null],
	  [null, null, null, null, null, null],
	  [null, null, null, null, null, null],
	  [null, null, null, null, null, null],
	  [null, null, null, null, null, null],
	  [null, null, null, null, null, null]
	];
	var row = 0;
	var column = 0;

	$(board).each(function(i, row) {
	  $(row).each(function(j, item) {
		row[j] = "X";

	  });

	});

	console.log(board);

	$(board).each(function(i, row) {

	  $("table tbody").append("<tr id='row" + i + "' class='row' data-row='" + i + "'></tr>");

	  $(row).each(function(j, item) {
		$("#row" + i).append("<td id='" + i + "-" + j + "' class='item' data-column='" + j + "'>" + item + "</td>");

	  });

	});

	$(".item").click(function() {
	  var id = $(this).attr("id");
	  row = parseInt(id.split("-")[0]);
	  column = parseInt(id.split("-")[1]);
	  toggleFooter();
	  $(this).unbind("click");
	});

	function toggleFooter() {
	  if ($("#message").css("display") == "block") {
		$("#message").css("display", "none");
		$("#buttons").css("display", "block");
	  }
	  else {
		$("#message").css("display", "block");
		$("#buttons").css("display", "none");
	  }
	}

	$("#buttons button").click(function(){
	  var oc = "";
	  if ($(this).attr("id") == "order")
		oc = "O";
	  else if ($(this).attr("id") == "chaos")
		oc = "C";
	  else {
		$("#buttons").css("display", "none");
		$("#message").css("display", "block").text("error: invalid selection");
	  }
	  board[row][column] = oc;
	  updateBoard();
	  checkWinner();
	  toggleFooter();
	});

	function updateBoard() {
	  $("table tr").each(function(rowIndex, row){
		$("td", this).each(function(columnIndex, item) {
		  $(this).text(board[rowIndex][columnIndex]);
		});
	  });
	}

	function checkWinner() {
	  var haveWinner = false; // this must equal 4 for win
	  var rowSeq = "";
	  $.each(board[row], function(key, value) {
		rowSeq += value;
	  })
	  console.log("row: " + row + ", rowSeq: " + rowSeq);
	  if (containsWin(rowSeq))
		haveWinner = true;

	  var colSeq = "";
	  $(board).each(function(key, value) {
		colSeq += value[column];
	  })
	  console.log("col: " + column + ", colSeq: " + colSeq);
	  if (containsWin(colSeq))
		haveWinner = true;

	  var diagSeq1 = "";
	  var r = row;
	  var c = column;
	  var startRow = row - column;
	  for (var i = 0; i < 6; i++) {
		console.log("coord: " + i + ", " + startRow);
		if (startRow > -1 && startRow < 6)
		  diagSeq1 += board[startRow][i];
		else
		  diagSeq1 += "#";
		startRow++;
	  }
	  console.log("diagSeq1: " + diagSeq1);
	  if (containsWin(diagSeq1))
		haveWinner = true;

	  var diagSeq2 = "";
	  var r = row;
	  var c = column;
	  var startRow = row + column;
	  for (var i = 0; i < 6; i++) {
		console.log("coord: " + i + ", " + startRow);
		if (startRow > -1 && startRow < 6)
		  diagSeq2 += board[startRow][i];
		else
		  diagSeq2 += "#";
		startRow--;
	  }
	  console.log("diagSeq2: " + diagSeq2);
	  if (containsWin(diagSeq2))
		haveWinner = true;

	  if (haveWinner)
		displayWinner();
	  else
		console.log("no winner yet");
	}

	function containsWin(seq) {
	  if (seq.indexOf("OOOOO") > -1 || seq.indexOf("CCCCC") > -1)
		return true;
	  else
		return false
	}

	function displayWinner() {
	  console.log("5 in a row. order wins.")
	}