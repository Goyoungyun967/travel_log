package kr.co.iei.board.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Locale;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.board.model.dto.BoardAccompanyDTO;
import kr.co.iei.board.model.dto.BoardCommentDTO;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.board.model.dto.BoardReportDTO;
import kr.co.iei.board.model.dto.CommentReportDTO;
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
	//게시판 수정
	@PatchMapping
	public ResponseEntity<Boolean> updateBoard(@ModelAttribute BoardDTO board , @ModelAttribute MultipartFile thumbnail,@ModelAttribute MultipartFile[] boardFile){
		if(thumbnail != null) {
			String savepath = root+"/board/thumb/";
			String filepath = fileUtils.upload(savepath, thumbnail);
			board.setBoardThumb(filepath);
		}
		List<BoardFileDTO> boardFileList = new ArrayList<BoardFileDTO>();
		if(boardFile != null) {
			String savepath = root+"/board/";
			for(MultipartFile file:boardFile) {
				BoardFileDTO boardFileDTO = new BoardFileDTO();
				String filename = file.getOriginalFilename();
				String filepath = fileUtils.upload(savepath, file);
				boardFileDTO.setFilename(filename);
				boardFileDTO.setFilepath(filepath);
				boardFileDTO.setFileNo(board.getBoardNo());
				boardFileList.add(boardFileDTO);
			}
		}
		List<BoardFileDTO> delFileList = boardService.updateBoard(board,boardFileList);
		if(delFileList != null) {
			String savrpath = root+"/board/";
			for(BoardFileDTO deleteFIle : delFileList) {
				File deFile = new File(savrpath+deleteFIle.getFilepath());
				deFile.delete();
			}
			return ResponseEntity.ok(true);
		}
		return  ResponseEntity.ok(false);
	}
	//좋아요 
	@PostMapping(value = "like/{boardNo}/{memberNo}")
	public ResponseEntity<Integer> likeBoard(@PathVariable int boardNo,@PathVariable int memberNo){
		int result = boardService.likeBoard(boardNo,memberNo); 
	
		return ResponseEntity.ok(result);
	}
	// 좋아요 취소
    @DeleteMapping("/unlike/{boardNo}/{memberNo}")
    public ResponseEntity<Integer> unlikeBoard(@PathVariable int boardNo, @PathVariable int memberNo) {
        int result = boardService.unlikeBoard(boardNo, memberNo); // 좋아요 취소 처리
        return ResponseEntity.ok(result); // 처리 결과 반환 (1: 성공, 0: 실패)
    }
    
    
    // 댓글 목록 조회
    @GetMapping("/commentList/{boardNo}")
    public ResponseEntity<List<BoardCommentDTO>> getCommentList(@PathVariable int boardNo) {
        List<BoardCommentDTO> comments = boardService.getCommentList(boardNo);
        System.out.println(comments);
        return ResponseEntity.ok(comments);
    }

    // 댓글 추가
    @PostMapping("/insertComment")
    public ResponseEntity<BoardCommentDTO> addComment(@ModelAttribute BoardCommentDTO comment
		
			 ) {
    	 if (comment.getCommentRef() == 0) {
    	        comment.setCommentRef(0);
    	    }
        boolean isAdded = boardService.addComment(comment);
        if (isAdded) {
        	System.out.println(comment);
            return ResponseEntity.ok(comment); // 댓글이 추가되었을 때
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 추가 실패 시
        }
    }

    // 댓글 수정
    @PatchMapping("/editComment/{commentNo}")
    public ResponseEntity<Boolean> editComment(@PathVariable int commentNo, @RequestBody Map<String, String> request) {
        String commentContent = request.get("commentContent");
        boolean result = boardService.editComment(commentNo, commentContent);
        return ResponseEntity.ok(result);
    }

    // 댓글 삭제
    @DeleteMapping("/deleteComment/{commentNo}")
    public ResponseEntity<Boolean> deleteComment(@PathVariable int commentNo) {
        boolean result = boardService.deleteComment(commentNo);
        return ResponseEntity.ok(result);
    }
    //댓글 좋아요 
  //좋아요 
  	@PostMapping(value = "/likeComment/{memberNo}/{commentNo}")
  	public ResponseEntity<Integer> likeComment(@PathVariable int memberNo,@PathVariable int commentNo){
  		int result = boardService.likeComment(memberNo,commentNo); 
  		
  		return ResponseEntity.ok(result);
  	}
  	// 좋아요 취소
      @DeleteMapping("/unlikeComment/{memberNo}/{commentNo}")
      public ResponseEntity<Integer> unlikeComment(@PathVariable int memberNo,@PathVariable int commentNo) {
          int result = boardService.unlikeComment(memberNo, commentNo); // 좋아요 취소 처리
          return ResponseEntity.ok(result); // 처리 결과 반환 (1: 성공, 0: 실패)
      }
    //게시판신고고
      @PostMapping("/report")
  		public ResponseEntity<Boolean> insertReport(@RequestBody BoardReportDTO report){
    	  int ressult = boardService.insertReport(report);
    	  return ResponseEntity.ok(ressult>0);
      }
      //댓글 신고
      @PostMapping("/commentReport")
		public ResponseEntity<Boolean> insertReport(@RequestBody CommentReportDTO commentReport){
  	  
  	  int ressult = boardService.insertReport(commentReport);
  	  return ResponseEntity.ok(ressult>0);
    }
    
    
  //동행게시판리스트
      @GetMapping("/accompanyList/{type}/{reqPage}")
      public ResponseEntity<Map> accompanyList(
              @PathVariable int type, @PathVariable int reqPage) {
          Map map = boardService.selectAccompanyList(type, reqPage);
          return ResponseEntity.ok(map);
      }

  //동행 게시판 등록
  	@PostMapping("/insertAccompany")
  		public ResponseEntity<Boolean> insertAccompany(@ModelAttribute BoardAccompanyDTO boardAccompany , @ModelAttribute MultipartFile thumnail, @ModelAttribute MultipartFile[] boardFile){
  		
  		
  		if(thumnail != null) {
			String savepath = root+"/board/thumb/";
			String filepath = fileUtils.upload(savepath,thumnail);
			boardAccompany.setBoardThumb(filepath);
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
		

		int result = boardService.insertAcoompanyBoard(boardAccompany,boardFileList);
	    return ResponseEntity.ok(result == 1 + boardFileList.size());
  		
  	}
  	//동행 게시판 조회수 처리
  	@PatchMapping("/updateReadCount/{boardNo}")
  	public ResponseEntity<Boolean> updateReadCount(@PathVariable int boardNo){
  		int result = boardService.updateReadCount(boardNo);
  		return ResponseEntity.ok(result>0);
  	}
  	//동행 게시판 상세보기 
  	@GetMapping(value = "/accompanyNo/{boardNo}")
  	public ResponseEntity<BoardAccompanyDTO> selectOneBoardAccompany(@PathVariable int boardNo){
  		BoardAccompanyDTO accompany = boardService.selectOneBoardAccompany(boardNo);
  		return ResponseEntity.ok(accompany);
  	}
  	//삭제는 똑같이 가져감
  	//동행 게시판 수정
//  @PatchMapping(value = "/AccompanyUpdate")
//	public ResponseEntity<Boolean> updateBoard(@ModelAttribute BoardAccompanyDTO boardAccompany , @ModelAttribute MultipartFile thumbnail,@ModelAttribute MultipartFile[] boardFile){
//		System.out.println(boardAccompany);
//	  if(thumbnail != null) {
//			String savepath = root+"/board/thumb/";
//			String filepath = fileUtils.upload(savepath, thumbnail);
//			boardAccompany.setBoardThumb(filepath);
//		}
//		List<BoardFileDTO> boardFileList = new ArrayList<BoardFileDTO>();
//		if(boardFile != null) {
//			String savepath = root+"/board/";
//			for(MultipartFile file:boardFile) {
//				BoardFileDTO boardFileDTO = new BoardFileDTO();
//				String filename = file.getOriginalFilename();
//				String filepath = fileUtils.upload(savepath, file);
//				boardFileDTO.setFilename(filename);
//				boardFileDTO.setFilepath(filepath);
//				boardFileDTO.setFileNo(boardAccompany.getBoardNo());
//				boardFileList.add(boardFileDTO);
//			}
//		}
//		List<BoardFileDTO> delFileList = boardService.updateBoardAccompany(boardAccompany,boardFileList);
//		if(delFileList != null) {
//			String savrpath = root+"/board/";
//			for(BoardFileDTO deleteFIle : delFileList) {
//				File deFile = new File(savrpath+deleteFIle.getFilepath());
//				deFile.delete();
//			}
//			return ResponseEntity.ok(true);
//		}
//		return  ResponseEntity.ok(false);
//	}
  	
  	

  	

    
    
}
