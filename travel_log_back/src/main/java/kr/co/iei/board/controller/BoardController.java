package kr.co.iei.board.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.board.model.service.BoardService;
import kr.co.iei.util.FileUtils;

@RestController
@CrossOrigin("*")
@RequestMapping(value ="/board")
@Tag(name="Board", description = "Board API")
public class BoardController {
	@Autowired
	private BoardService boardService; 
	@Autowired
	private FileUtils fileUtils;
	@Value("${file.root}")
	public String root;
	
	//여행게시판리스트
	@GetMapping("/boardList/{type}/{reqPage}")
	public ResponseEntity<Map> getBoardList(
	    @PathVariable int type, @PathVariable int reqPage) {
		Map map = boardService.selectBoardList(type,reqPage);
	    return ResponseEntity.ok(map);
	}
	//동행게시판리스트
	@GetMapping("/accompanyList/{type}/{reqPage}")
	public ResponseEntity<Map> accompanyList(
		    @PathVariable int type, @PathVariable int reqPage) {
		    Map map = boardService.selectAccompanyList(type,reqPage);
		    return ResponseEntity.ok(map);
		}
	//일반게시판 등록 
	//회원 번호 아직 안줌
	@PostMapping
	public ResponseEntity<Boolean> insertBoard(
			@ModelAttribute BoardDTO board,
			@ModelAttribute MultipartFile thumnail,
			@ModelAttribute MultipartFile[] boardFile){
		
		System.out.println(board);
		//썸네일 처리
		if(thumnail != null) {
			String savepath = root+"/board/thumb/";
			String filepath = fileUtils.upload(savepath,thumnail);
			board.setBoardThumb(filepath);
		}
		List<BoardFileDTO> boardFileList = new ArrayList<BoardFileDTO>();
		if(boardFile != null) {
			String savepath = root + "/board/";
			for(MultipartFile file : boardFile) {
				BoardFileDTO fileDTO = new BoardFileDTO();
				String filename = file.getOriginalFilename();
				String filepath = fileUtils.upload(savepath, file);
				fileDTO.setFilename(filename);
				fileDTO.setFilepath(filepath);
				boardFileList.add(fileDTO);
			}
		}
		int result = boardService.insertBoard(board,boardFileList);
	    return ResponseEntity.ok(result == 1 + boardFileList.size());
	}
	//게시판 상세보기 
	@GetMapping(value = "/boardNo/{boardNo}")
	public ResponseEntity<BoardDTO> selectOneBoard(@PathVariable int boardNo){
		BoardDTO board = boardService.selectOneBoard(boardNo);
		return ResponseEntity.ok(board);
	}
	//안할수도 있음{첨부파일 저장하기}
	@GetMapping(value = "/file/{boardFileNo}")
	public ResponseEntity<Resource> filedown(@PathVariable int boardFileNo) throws FileNotFoundException{
		System.out.println(boardFileNo);
		BoardFileDTO boardFile = boardService.getBoardFile(boardFileNo);
		String savepath = root+"/board/";
		File file = new File(savepath+boardFile.getFilepath());
		
		Resource resource = new InputStreamResource(new FileInputStream(file));
		//파일 다운로드를위한 헤더 설정
		HttpHeaders header = new HttpHeaders();
//		header.add("content-Disposition","attachment; filename=\""+boardFile.getFilename()+"\"");//파일명 세팅
		header.add("Cache-Control","no-cache,no-store,must-revalidate");
		header.add("Pragma", "no-cache");
		header.add("Expires","0");
		return ResponseEntity
					.status(HttpStatus.OK)
					.headers(header)
					.contentLength(file.length())
					.contentType(MediaType.APPLICATION_OCTET_STREAM)
					.body(resource);
	}
	//일반게시판 삭제
	@DeleteMapping(value = "/delete/{boardNo}")
	public ResponseEntity<Integer> deleteBoard(@PathVariable int boardNo){
		List<BoardFileDTO> delFileList = boardService.deleteBoard(boardNo);
		
		if(delFileList != null) {
			 String savepath = root+"/board/";
			 for(BoardFileDTO boardFile : delFileList) {
				 File deFile= new File(savepath+boardFile.getFileNo());
				 deFile.delete();
			 }
			 return ResponseEntity.ok(1);
		}else {
			return ResponseEntity.ok(0);
		}
	}
	//일반게시판 업데이트
	
	
}
