package kr.co.iei.board.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.service.BoardService;

@RestController
@CrossOrigin("*")
@RequestMapping(value ="/board")
@Tag(name="Board", description = "Board API")
public class BoardController {
	@Autowired
	private BoardService boardService; 
	@GetMapping("/list/{type}/{reqPage}")
	public ResponseEntity<Map> getBoardList(
	    @PathVariable int type, @PathVariable int reqPage) {
	    Map map = boardService.selectBoardList(type,reqPage);
	    return ResponseEntity.ok(map);
	}
}
