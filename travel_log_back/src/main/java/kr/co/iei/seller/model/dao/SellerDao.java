package kr.co.iei.seller.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.seller.model.dto.LodgmentStorageDTO;

@Mapper
public interface SellerDao {

	List selectLodgmentList(int sellerNo);

	List selectXlsxHotelInfo(String searchInfo);

	LodgmentStorageDTO selectOneLodgment(int lodgmentNo);

	int insertLodgment(LodgmentStorageDTO ls);

}
