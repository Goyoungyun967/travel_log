package kr.co.iei.lodgment.model.dao;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.lodgment.model.dto.LodgmentDTO;
import kr.co.iei.lodgment.model.dto.LodgmentMemberInquireDTO;
import kr.co.iei.lodgment.model.dto.LodgmentReviewDTO;
import kr.co.iei.lodgment.model.dto.LodgmentReviewFileDTO;
import kr.co.iei.lodgment.model.dto.RequestDTO;
import kr.co.iei.lodgment.model.dto.ReviewStatusDTO;
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

	List selectReviewList(RequestDTO request);

	ReviewStatusDTO reviewStatus(RequestDTO lodgmentInfo);

	int reviewLike(RequestDTO request);

	int reviewLikeCancle(RequestDTO request);

	int reviewReport(RequestDTO request);

	int insertMemberInquire(LodgmentMemberInquireDTO inquire);

	int totalCountInquire(int lodgmentNo);

	List selectInquireList(RequestDTO request);

	int deleteInquire(RequestDTO request);

	LodgmentReviewDTO getReview(int reviewNo);

	int updateRevie(LodgmentReviewDTO newReview);

	int deleteReviewFile(int[] delImgFileNo);

	List<LodgmentReviewFileDTO> selectReviewFile(int[] delImgFileNo);

	int deleteReview(int reviewNo);

	//List selectGetAllReviewImg(int lodgmentNo);

	//List<RoomDTO> getRoomInfoList(int lodgmentNo, String startDate, String endDate, int guset);
	
}
