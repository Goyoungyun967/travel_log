package kr.co.iei.seller.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.inquiry.model.dto.InquiryDTO;
import kr.co.iei.lodgment.model.dto.LodgmentReviewDTO;
import kr.co.iei.seller.model.dto.BookingInfoDTO;
import kr.co.iei.seller.model.dto.InsertRoomDTO;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.QnaComment;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.seller.model.dto.RoomFileDTO;
import kr.co.iei.seller.model.dto.RoomQnaDTO;
import kr.co.iei.seller.model.dto.RoomServiceTagDTO;
import kr.co.iei.seller.model.dto.StmInfoDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface SellerLodgmentDao {

//	List selectLodgmentList(int sellerNo);
	List selectLodgmentList(int sellerNo);

	List selectXlsxHotelInfo(String searchInfo);

	LodgmentStorageDTO selectOneLodgment(int lodgmentNo);
	
	int totalCount();
	
//	List<LodgmentReviewDTO> selectLodgmentReview(int lodgmentNo, PageInfo pi);
	List<LodgmentReviewDTO> selectLodgmentReview(int lodgmentNo, int start, int end);

	int insertLodgment(LodgmentStorageDTO ls);

	int deleteLodgment(int lodgmentNo);

	List<RoomFileDTO> selectRoomFile(int roomNo);

	List<RoomDTO> selectRoomInfo(int lodgmentNo);

	int insertRoom(RoomDTO room);

	int insertRoomFile(RoomFileDTO roomFile);

	int insertServiceTag(RoomServiceTagDTO rst);

	BookingInfoDTO bookInfo(int bookNo);

	List<StmInfoDTO> selectStmInfo(StmInfoDTO st);

	List<StmInfoDTO> selectStmSearchInfo(StmInfoDTO st);
	
	RoomDTO selectRoomViewInfo(int roomNo);

	List<InquiryDTO> selectInqList(int sellerNo);

	InquiryDTO selectInqView(int inqNo);

	List selectReserve(int sellerNo);

	int delUpLodgmentRoom(int lodgmentNo);

	int delUpLodgment(int lodgmentNo);

	int delUpRoom(int roomNo);

	int updatecomment(LodgmentReviewDTO ld);

	/**/
	int updateRoom(RoomDTO room);

	List<RoomFileDTO> selectRoomFile(int[] delRoomFileNo);

	int deleteRoomFile(int[] delRoomFileNo);

	int delAllServiceTag(int roomNo);

	int updateLodgment(LodgmentStorageDTO ls);

	int totalCountQna();

	List<RoomQnaDTO> selectQna(int lodgmentNo, int start, int end);

	int insertSellerComment(QnaComment qc);

	List<QnaComment> selectQnaCom();

	List<QnaComment> selectQnaComment(int lodgmentNo);

	int delUpComment(LodgmentReviewDTO ld);

	
	

}
