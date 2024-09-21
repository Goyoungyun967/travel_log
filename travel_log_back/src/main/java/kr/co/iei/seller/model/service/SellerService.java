package kr.co.iei.seller.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.dao.SellerDao;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;

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


}
