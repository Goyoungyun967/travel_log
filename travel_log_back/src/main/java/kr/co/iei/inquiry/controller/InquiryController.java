package kr.co.iei.inquiry.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.inquiry.model.dto.InquiryDTO;
import kr.co.iei.inquiry.model.dto.InquiryFileDTO;
import kr.co.iei.inquiry.model.service.InquiryService;
import kr.co.iei.util.FileUtils;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/inquiry")
@Tag(name = "INQUIRY", description = "INQUIRY API")
public class InquiryController {
	@Autowired
	private InquiryService inquiryService;
	@Autowired
	private FileUtils fileUtil;
	@Value("${file.root}")
	private String root;
	
	@PostMapping
	@Operation(summary = "1:1 문의 등록",description = "제목,내용,회원번호 또는 판매자번호,파일을 입력해서 db에 insert")
	public ResponseEntity<Boolean> insertInquiry(@ModelAttribute InquiryDTO inquiry,@ModelAttribute MultipartFile[] upfile){
		List<InquiryFileDTO> fileList = new ArrayList<InquiryFileDTO>();
		if(upfile != null) {
			String savepath = root+"/inquiry/"; 
			for (MultipartFile file : upfile) {
				InquiryFileDTO inquiryFile = new InquiryFileDTO();
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.upload(savepath, file);
				inquiryFile.setFilename(filename);
				inquiryFile.setFilepath(filepath);
				fileList.add(inquiryFile);
			}
		}
		int result = inquiryService.insertInquiry(inquiry,fileList);
		return ResponseEntity.ok(result == fileList.size()+1);
	}
	
	@DeleteMapping(value="/{inquiryNo}")
	@Operation(summary = "1:1 문의 삭제",description = "번호를 받아서 db에서 delete 후 저장된 파일 삭제")
	public ResponseEntity<Boolean> deleteInquiry(@PathVariable int inquiryNo){
		List<InquiryFileDTO> delFileList = inquiryService.deleteInquiry(inquiryNo);
		if(delFileList != null) {
			String savepath = root+"/inquiry/";
			for (InquiryFileDTO file : delFileList) {
				File delFile = new File(savepath+file.getFilepath());
				delFile.delete();
			}
		}
		return ResponseEntity.ok(delFileList != null);
	}
	
	@GetMapping(value="/{inquiryNo}")
	@Operation(summary = "1:1 문의 조회",description = "1:1 문의 번호를 받아서 문의글 정보 조회")
	public ResponseEntity<InquiryDTO> selectOneInquiry(@PathVariable int inquiryNo){
		InquiryDTO inquiry = inquiryService.selectOneInquiry(inquiryNo);
		return ResponseEntity.ok(inquiry);
	}
}
