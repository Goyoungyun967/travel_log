package kr.co.iei.lodgment.model.dao;

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
			int guest);

	
//	SELECT *
//	FROM (
//	    SELECT
//	        lodgment_no,
//	        lodgment_name,
//	        lodgment_addr,
//	        lodgment_img_path,
//	        lodgment_star_grade,
//	        ROWNUM AS rn
//	    FROM (
//	        SELECT
//	            lodgment_no,
//	            lodgment_name,
//	            lodgment_addr,
//	            lodgment_img_path,
//	            lodgment_star_grade
//	        FROM
//	            lodgment_STORAGE
//	        WHERE
//	            lodgment_addr LIKE '%' || #{lodgment} || '%'
//	            AND lodgment_no IN (
//	                SELECT room_no
//	                FROM room
//	                WHERE room_no IN (
//	                    SELECT lodgment_no
//	                    FROM booking
//	                    WHERE ( start_date <![CDATA[<]]>= #{endDate}  AND end_date >= #{startDate})
//	                    AND guest_count >= #{guest}
//	                )
//	            )
//	        ORDER BY lodgment_star_grade DESC
//	    )
//	    WHERE  ROWNUM <![CDATA[<]]>= #{limit}  
//	)
//	WHERE #{offset} <![CDATA[<]]> rn
}
