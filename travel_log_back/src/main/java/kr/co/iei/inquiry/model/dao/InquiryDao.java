package kr.co.iei.inquiry.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.inquiry.model.dto.InquiryDTO;
import kr.co.iei.inquiry.model.dto.InquiryFileDTO;
import kr.co.iei.inquiry.model.dto.InquiryReplyDTO;



@Mapper
public interface InquiryDao {

	int getTotalCount(Map<String, Object> m);

	List<InquiryDTO> selectInquiryList(Map<String, Object> m);

	int insertInquiry(InquiryDTO inquiry);

	int insertInquiryFile(InquiryFileDTO inquiryFile);

	List<InquiryFileDTO> selectInquiryFileList(int inquiryNo);

	InquiryDTO selectOneInquiry(int inquiryNo);

	InquiryReplyDTO selectInquiryReply(int inquiryNo);

	int deleteInquiry(int inquiryNo);

	int insertInquiryReply(InquiryReplyDTO inquiryReply);

	List getLodgmentResionData();

	List getLodgmentResionMemberData(String region);

	

}
