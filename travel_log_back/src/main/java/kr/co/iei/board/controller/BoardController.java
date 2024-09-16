package kr.co.iei.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.board.model.service.BoardService;

@RestController
@CrossOrigin("*")
@RequestMapping
@Tag(name="Board", description = "Board API")
public class BoardController {
	@Autowired
	private BoardService boardService; 
}
