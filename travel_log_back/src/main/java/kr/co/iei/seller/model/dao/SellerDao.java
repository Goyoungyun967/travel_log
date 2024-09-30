package kr.co.iei.seller.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.inquiry.model.dto.InquiryDTO;
import kr.co.iei.seller.model.dto.BookingInfoDTO;
import kr.co.iei.seller.model.dto.InsertRoomDTO;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.seller.model.dto.RoomFileDTO;
import kr.co.iei.seller.model.dto.RoomServiceTagDTO;
import kr.co.iei.seller.model.dto.SellerDTO;
import kr.co.iei.seller.model.dto.RoomServiceTagDTO;
import kr.co.iei.seller.model.dto.StmInfoDTO;

@Mapper
public interface SellerDao {

	List selectLodgmentList(int sellerNo);

	List selectXlsxHotelInfo(String searchInfo);

	LodgmentStorageDTO selectOneLodgment(int lodgmentNo);

	int insertLodgment(LodgmentStorageDTO ls);

	int deleteLodgment(int lodgmentNo);

	List<RoomFileDTO> selectRoomFile(int roomNo);

	List<RoomDTO> selectRoomInfo(int lodgmentNo);

	int insertRoom(InsertRoomDTO room);

	int insertRoomFile(RoomFileDTO roomFile);

	int insertServiceTag(RoomServiceTagDTO rst);

	BookingInfoDTO bookInfo(int bookNo);

	List<StmInfoDTO> selectStmInfo(StmInfoDTO st);

	List<StmInfoDTO> selectStmSearchInfo(StmInfoDTO st);

	//형묵 - 판매자 회원가입
	int insertSeller(SellerDTO seller);
	
	//형묵 - sellerid 중복체크
	int checkSellerId(String businessNo);
	
	RoomDTO selectRoomViewInfo(int roomNo);

	List<InquiryDTO> selectInqList(InquiryDTO iqd);

	SellerDTO selectLoginSeller(String businessNo);

}
