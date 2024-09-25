package kr.co.iei.lodgment.model.dao;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.lodgment.model.dto.LodgmentDTO;
import kr.co.iei.lodgment.model.dto.SearchLodgmentDTO;

@Mapper
public interface LodgmentDao {

	List serviceList();

	List search(String value);

	List searchLodgment(String value);

	List<SearchLodgmentDTO> getLodgmentList(int start, int end, String lodgment, String startDate, String endDate,
			int guest, int minPrice, int maxPrice, int[] selectedServiceTagsArry, 
			int starValue, int order, int lodgmentType);
	
}
