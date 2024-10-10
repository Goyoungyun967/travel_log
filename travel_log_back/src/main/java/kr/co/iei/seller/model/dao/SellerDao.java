package kr.co.iei.seller.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.seller.model.dto.SellerDTO;


@Mapper
public interface SellerDao {

	//형묵 - 판매자 회원가입
	int insertSeller(SellerDTO seller);
	
	//형묵 - sellerid 중복체크
	int checkSellerId(String businessNo);

	//seller 가입자 승인
	int updateSellerApp(int[] sellerNo);

	SellerDTO selectLoginSeller(String businessNo);

	//seller refresh 형묵
	SellerDTO selectOneSeller(int sellerNo);
	
	//admin용 sellerList pagenavi에 쓸 totalCount
	int getTotalCount(int sellerApp);
	
	//admin용 sellerList조회
	List selectSellerList(Map<String, Object> m);
	
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
	
}
