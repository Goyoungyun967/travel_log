package kr.co.iei.seller.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.seller.model.dto.BookingInfoDTO;
import kr.co.iei.seller.model.dto.InsertRoomDTO;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.seller.model.dto.RoomFileDTO;
import kr.co.iei.seller.model.dto.RoomServiceTag;

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

	int insertServiceTag(RoomServiceTag rst);

	BookingInfoDTO bookInfo(int bookNo);

}
