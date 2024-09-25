package kr.co.iei.seller.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.dao.SellerDao;
import kr.co.iei.seller.model.dto.BookingInfoDTO;
import kr.co.iei.seller.model.dto.InsertRoomDTO;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.seller.model.dto.RoomFileDTO;
import kr.co.iei.seller.model.dto.RoomServiceTag;
import kr.co.iei.seller.model.dto.ServiceTagDTO;
import kr.co.iei.seller.model.dto.StmInfoDTO;

@Service
public class SellerService {
	@Autowired
	private SellerDao sellerDao;

	// 메인(등록한 호텔 정보)
	public List selectLodgmentList(int sellerNo) {
		List list = sellerDao.selectLodgmentList(sellerNo);
		return list;
	}

	// 기존 숙소 검색
	public List selectXlsxHotelInfo(String searchInfo) {
		List list = sellerDao.selectXlsxHotelInfo(searchInfo);
		return list;
	}
	
	// 판매자 정보 조회
	public MemberDTO selectOneSeller(int sellerNo) {
		//		SellerDTO로 바꿔야함
		return null;
	}

	// 호텔 정보 출력
	public LodgmentStorageDTO selectOneLodgment(int lodgmentNo) {
		LodgmentStorageDTO ls = sellerDao.selectOneLodgment(lodgmentNo);
		return ls;
	}

	// 호텔 등록
	@Transactional
	public int insertLodgment(LodgmentStorageDTO ls) {
		LodgmentStorageDTO lg = sellerDao.selectOneLodgment(ls.getLodgmentNo());
		if(lg == null) {
			int result = sellerDao.insertLodgment(ls);
			int rs = sellerDao.deleteLodgment(ls.getLodgmentNo());
			return result;
		}
		return 0;
	}

	// 호텔 상세 (호텔 + 객실 상세)
	public Map selectHotelInfo(int lodgmentNo) {
		Map<String, Object> map = new HashMap<String, Object>();

		LodgmentStorageDTO ls = sellerDao.selectOneLodgment(lodgmentNo); // 호텔 정보 출력
		List<RoomDTO> list = sellerDao.selectRoomInfo(lodgmentNo); 
		System.out.println(list);
	
		map.put("lodgment",ls);
		map.put("list", list);
		
		
		return map;
	}

	// 객실 등록(객실 정보, 파일, 해시태그 동시 처리)
	@Transactional
	public int insertRoom(InsertRoomDTO room, List<RoomFileDTO> roomFileList) {
		int result = sellerDao.insertRoom(room);
		System.out.println(room);
		for(RoomFileDTO roomFile : roomFileList) {
			roomFile.setRoomNo(room.getRoomNo());
			result += sellerDao.insertRoomFile(roomFile);
		}
		// 체크가 null 값이 아닐 때만 (해시태그가 비어있을 수도 있으니까...)
	    if (room.getServiceTag() != null) {
	        for (int serviceTagNo : room.getServiceTag()) {
	        	RoomServiceTag rst = new RoomServiceTag();
	            rst.setRoomNo(room.getRoomNo());
	            rst.setServiceTagNo(serviceTagNo); // 태그 값을 설정

	            result += sellerDao.insertServiceTag(rst); // 서비스 태그 DB에 삽입
	        }
	    }
		
		return result;
	}

	public BookingInfoDTO bookInfo(int bookNo) {
		BookingInfoDTO bid = sellerDao.bookInfo(bookNo);
		return bid;
	}

	public List<StmInfoDTO> selectStmInfo(int sellerNo) {
		List<StmInfoDTO> ls = sellerDao.selectStmInfo(sellerNo);
		return ls;
	}


}
