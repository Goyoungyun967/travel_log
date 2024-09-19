package kr.co.iei.seller.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.dao.SellerDao;

@Service
public class SellerService {
	@Autowired
	private SellerDao sellerDao;

	public List selectLodgmentList(int sellerNo) {
		List list = sellerDao.selectLodgmentList(sellerNo);
		return list;
	}

	public MemberDTO selectOneSeller(int sellerNo) {
		// TODO Auto-generated method stub
		return null;
	}
}
