package kr.co.iei.seller.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.dao.SellerDao;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.seller.model.dto.RoomFileDTO;

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
		List list = sellerDao.selectOneRoom(lodgmentNo); // 객실 정보 출력
		System.out.println(list);
		
//		// 있으면 넣고 ~
//		if(list != null) {
//			List<RoomFileDTO> rfd = sellerDao.selectRoomFile(list.getRoomNo()); // 객실 사진 리스트로 받아오기
//			list.setFileList(rfd);
//			map.put("room",list);
//			
//		}
		map.put("lodgment",ls);
		
		
		return map;
	}

	public List<RoomDTO> selectRoomInfo(int lodgmentNo) {
		List list = sellerDao.selectOneRoom(lodgmentNo); // 객실 정보 출력
		System.out.println(list);
//		if(list != null) {
//		List<RoomFileDTO> rfd = sellerDao.selectRoomFile(list.getRoomNo()); // 객실 사진 리스트로 받아오기
////		list.setFileList(rfd);
//		map.put("room",list);
//		
//	}
		return null;
	}


}
