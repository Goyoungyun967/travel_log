package kr.co.iei.lodgment.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LodgmentDao {

	List serviceList();

	List search(String value);

	List searchLodgment(String value);

}
