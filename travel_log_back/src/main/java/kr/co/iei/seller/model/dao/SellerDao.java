package kr.co.iei.seller.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.seller.model.dto.SellerDTO;


@Mapper
public interface SellerDao {

	//형묵 - 판매자 회원가입
	int insertSeller(SellerDTO seller);
	
	//형묵 - sellerid 중복체크
	int checkSellerId(String businessNo);

	SellerDTO selectLoginSeller(String businessNo);

	//seller refresh 형묵
	SellerDTO selectOneSeller(int sellerNo);
	
}
