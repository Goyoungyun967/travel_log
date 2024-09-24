package kr.co.iei.lodgment.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.lodgment.model.dto.LodgmentDTO;

@Mapper
public interface LodgmentDao {

	List serviceList();

	List search(String value);

	List searchLodgment(String value);

	List<LodgmentDTO> getLodgmentList(int offset, int limit, String lodgment, String startDate, String endDate,
			int guest);


}
