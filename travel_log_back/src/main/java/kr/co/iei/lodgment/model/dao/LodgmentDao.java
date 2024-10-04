package kr.co.iei.lodgment.model.dao;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.lodgment.model.dto.LodgmentDTO;
import kr.co.iei.lodgment.model.dto.LodgmentReviewDTO;
import kr.co.iei.lodgment.model.dto.LodgmentReviewFileDTO;
import kr.co.iei.lodgment.model.dto.Page;
import kr.co.iei.lodgment.model.dto.ReviewStatus;
import kr.co.iei.lodgment.model.dto.RoomSearchDTO;
import kr.co.iei.lodgment.model.dto.SearchLodgmentDTO;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface LodgmentDao {

	List serviceList();

	List search(String value);

	List searchLodgment(String value);

	List<SearchLodgmentDTO> getLodgmentList(int start, int end, String lodgment, String startDate, String endDate,
			int guest, int minPrice, int maxPrice, int[] selectedServiceTagsArry, 
			int starValue, int order, int lodgmentType);

	LodgmentDTO getLodgmentInfo(int lodgmentNo);

	List getRoomNo(int lodgmentNo);

	RoomSearchDTO getRoomList(int roomNo, int lodgmentNo, String startDate, String endDate);

	int getCollectLodgmentNum(int loginNo, int lodgmentNo);

	int lodgmentCollection(int loginNo, int lodgmentNo);

	int insertCollect(int lodgmentNo, int loginNo);

	int deleteCollect(int lodgmentNo, int loginNo);

	int insertReview(LodgmentReviewDTO lodgmentReview);

	int insertReviewFile(LodgmentReviewFileDTO file);

	//List<LodgmentReviewDTO> getReviewList(int lodgmentNo);

	int totalCount(int lodgmentNo);

	List selectReviewList(Page page);

	ReviewStatus reviewStatus(Page lodgmentInfo);

	//List selectGetAllReviewImg(int lodgmentNo);

	//List<RoomDTO> getRoomInfoList(int lodgmentNo, String startDate, String endDate, int guset);
	
}
