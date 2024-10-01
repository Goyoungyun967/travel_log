package kr.co.iei.seller.model.dao;

import java.util.List;
import java.util.Map;

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

	//형묵 - 판매자 회원가입
	int insertSeller(SellerDTO seller);
	
	//형묵 - sellerid 중복체크
	int checkSellerId(String businessNo);

	//admin용 sellerList pagenavi에 쓸 totalCount
	int getTotalCount(int sellerApp);

	//admin용 sellerList조회
	List selectSellerList(Map<String, Object> m);

	//seller 가입자 승인
	int updateSellerApp(int[] sellerNo);

}
