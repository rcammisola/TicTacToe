app.controller("mainController", function($scope){
	$scope.init = function() {
		$scope.gameOver = false;
		$scope.winner = '';
		$scope.currentPlayer = 'X';
		$scope.board = [
			[{data: '', win: false}, {data: '', win: false}, {data: '', win: false}],
			[{data: '', win: false}, {data: '', win: false}, {data: '', win: false}],
			[{data: '', win: false}, {data: '', win: false}, {data: '', win: false}],
		];
	};
	
	$scope.setTile = function(row, col) {
		if(!$scope.gameOver && $scope.board[row][col].data == '') {
			$scope.board[row][col].data = $scope.currentPlayer;
			switchPlayer();
			
			$scope.board = isWinningMove($scope.board);
		}
	};
	
	$scope.restartGame = function(){
		$scope.init();
	};
	
	function isWinningMove(board){
		// check each row and column for win
		for(var i=0; i<board.length; i++) {
			if(checkRow(board[i])) {
				var winningPlayer = '';
				// set win to true along row i
				for(var r=0;r<board[i].length;r++){
					board[i][r].win = true;
					winningPlayer = board[i][r].data;
				}
				
				$scope.gameOver = true;
				break;
			}
			
			// other wise check the column
			if(checkCol(i, board)){
				for(var r=0;r<board[i].length;r++){
					board[r][i].win = true;
					winningPlayer = board[r][i].data;
				}
				
				$scope.gameOver = true;
				break;
			}
		}
		
		// failing that, check the diagonals
		if(!$scope.gameOver) {
			if(board[0][0].data == board[1][1].data && board[0][0].data == board[2][2].data && board[0][0].data != '') {
				for(var r=0;r<board.length;r++){
					board[r][r].win = true;
				}
				
				$scope.gameOver = true;
			}
			
			if(board[0][2].data == board[1][1].data && board[0][2].data == board[2][0].data && board[0][2].data != '') {
				board[0][2].win = true;
				board[1][1].win = true; 
				board[2][0].win = true;
				
				$scope.gameOver = true;
			}
		}
		
		return board;
	};
	
	function checkRow(row) {
		if( row[0].data == row[1].data && row[0].data == row[2].data && row[0].data != ''){
			return true;
		}
		return false;
	};
	
	function checkCol(col, board) {
		if(board[0][col].data == board[1][col].data && board[0][col].data == board[2][col].data && board[0][col].data != '') {
			return true;
		}
		return false;
	}
	
	function switchPlayer(){
		if($scope.currentPlayer == 'X') {
			$scope.currentPlayer = 'O';
		} else {
			$scope.currentPlayer = 'X';
		}
	};
});