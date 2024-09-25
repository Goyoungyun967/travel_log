package kr.co.iei.lodgment.model.service;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.lodgment.model.dao.LodgmentDao;
import kr.co.iei.lodgment.model.dto.LodgmentDTO;
import kr.co.iei.lodgment.model.dto.SearchLodgmentDTO;

@Service
public class LodgmentService {

	@Autowired
	private LodgmentDao lodgmentDao;

	public List serviceList() {
		List list = lodgmentDao.serviceList();
		return list;
	}

	public Map search(String value) {
		List list = lodgmentDao.search(value);
		List name = lodgmentDao.searchLodgment(value);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("name", name);
		return map;
	}



	public List<SearchLodgmentDTO> getLodgmentList(int reqPage, String lodgment, String startDate, String endDate,
			int guest, int minPrice, int maxPrice, int[] selectedServiceTagsArry, int starValue, int order, int lodgmentType) {
		 int limit = 10;  //한페이지당 열개 
	     int start = (reqPage - 1) * limit +1; // 1~
	     int end = reqPage*limit; //~10
			System.out.println("selectedServiceTagsArry : "+selectedServiceTagsArry.length);
			System.out.println("minPrice : "+minPrice);
			System.out.println("maxPrice : "+maxPrice);
			System.out.println("starValue : "+starValue);
			System.out.println("order : "+order);
			System.out.println("lodgmentType : "+lodgmentType);
	     List<SearchLodgmentDTO> list = lodgmentDao.getLodgmentList
	    		 (start, end, lodgment, startDate.substring(0, 10), endDate.substring(0, 10), guest,
	    				 minPrice, maxPrice, selectedServiceTagsArry, starValue, order, lodgmentType);

		return list;
	}
}
