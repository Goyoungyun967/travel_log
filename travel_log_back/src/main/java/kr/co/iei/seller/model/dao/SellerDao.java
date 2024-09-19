package kr.co.iei.seller.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SellerDao {

	List selectLodgmentList(int sellerNo);

}
