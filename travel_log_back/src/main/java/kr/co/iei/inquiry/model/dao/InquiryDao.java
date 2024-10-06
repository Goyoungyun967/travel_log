package kr.co.iei.inquiry.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.inquiry.model.dto.InquiryDTO;
import kr.co.iei.inquiry.model.dto.InquiryFileDTO;
import kr.co.iei.inquiry.model.dto.InquiryReplyDTO;
import kr.co.iei.seller.model.dto.SellerDTO;



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

	//회원 이용 차트
	List getLodgmentResionData();

	List getLodgmentResionSearchMemberData(String region);

	List getLodgmentResionMemberData();

	//판매자 차트
	List getSellerList();

	List getSellerListSales(Map<String, Object> map);

	List getSellerSales(int sellerNo);

	List getSellerSalesGender(int sellerNo);

	List getSellerSalesAge(int sellerNo);

	List getSellerSalesList();
	
	//정산
	List<SellerDTO> selectSellerSales();

	int insertSellerStm(SellerDTO sellerDTO);

	List getSellerStmList(Map<String, Object> m);

	int getSellerStmCount(int status);

	int updateStm(int[] stmNum);

	//상품 게시글 관리
	List getAdminLodgmentList();

	int getAdminLodgmentCount(int lodgmentDelete);

	List getAdminLodgmentList(Map<String, Object> m);

	int updateLodgmentDelete(int[] lodgmentNo);

}
