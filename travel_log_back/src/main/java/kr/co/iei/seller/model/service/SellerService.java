package kr.co.iei.seller.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.inquiry.model.dto.InquiryDTO;
import kr.co.iei.lodgment.model.dto.LodgmentReviewDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.dao.SellerDao;
import kr.co.iei.seller.model.dao.SellerLodgmentDao;
import kr.co.iei.seller.model.dto.BookingInfoDTO;
import kr.co.iei.seller.model.dto.InsertRoomDTO;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.LoginSellerDTO;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.seller.model.dto.RoomFileDTO;
import kr.co.iei.seller.model.dto.RoomServiceTagDTO;
import kr.co.iei.seller.model.dto.SellerDTO;
import kr.co.iei.seller.model.dto.ServiceTagDTO;
import kr.co.iei.seller.model.dto.StmInfoDTO;
import kr.co.iei.util.FileUtils;
import kr.co.iei.util.JwtUtils;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;
import kr.co.iei.util.SellerJwtUtils;

@Service
public class SellerService {
	@Autowired
	private SellerDao sellerDao;

	@Autowired
	private SellerLodgmentDao sellerLodgmentDao;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	private PageUtil pageUtil;

	@Autowired
	private SellerJwtUtils sellerJwtUtils;

	@Autowired
	private FileUtils fileUtil;

	@Autowired
	private JwtUtils jwtUtil;

	@Value("${file.root}")
	public String root;

	// 메인(등록한 호텔 정보)
//	public List selectLodgmentList(int sellerNo) {
//		List list = sellerLodgmentDao.selectLodgmentList(sellerNo);
//		return list;
//	}
//	public List selectLodgmentList(String token) {
//		// 로그인시 받은 토큰을 검증한 후 회원아이디랑 등급을 추출해서 리턴받음
//		// 토큰 체크
//		LoginSellerDTO loginSeller = jwtUtil.sellerCheckToken(token);
//		System.out.println(loginSeller);
//		// 토큰 해석으로 받은 아이디를 통해서 DB에서 회원정보 조회
//		List list = sellerLodgmentDao.selectLodgmentList(loginSeller.getSellerNo());
//		System.out.println(list);
//		return list;
////		return null;
//	}

	// 메인(등록한 호텔 정보)
	public List selectLodgmentList(int loginNo) {
		List list = sellerLodgmentDao.selectLodgmentList(loginNo);
		return list;
	}

	// 기존 숙소 검색
	public List selectXlsxHotelInfo(String searchInfo) {
		List list = sellerLodgmentDao.selectXlsxHotelInfo(searchInfo);
		return list;
	}

	// 판매자 정보 조회
	public MemberDTO selectOneSeller(int sellerNo) {
		// SellerDTO로 바꿔야함
		return null;
	}

	// 호텔 정보 출력
	public LodgmentStorageDTO selectOneLodgment(int lodgmentNo) {
		LodgmentStorageDTO ls = sellerLodgmentDao.selectOneLodgment(lodgmentNo);
		return ls;
	}

	// 호텔 등록
	@Transactional
	public int insertLodgment(LodgmentStorageDTO ls) {
		LodgmentStorageDTO lg = sellerLodgmentDao.selectOneLodgment(ls.getLodgmentNo());
		if (lg == null) {
			int result = sellerLodgmentDao.insertLodgment(ls);
			int rs = sellerLodgmentDao.deleteLodgment(ls.getLodgmentNo());
			return result;
		}
		return 0;
	}

	// 호텔 상세 (호텔 + 객실 상세)
	public Map selectHotelInfo(int lodgmentNo, int reqPage) {
		Map<String, Object> map = new HashMap<String, Object>();

		LodgmentStorageDTO ls = sellerLodgmentDao.selectOneLodgment(lodgmentNo); // 호텔 정보 조회
		List<RoomDTO> list = sellerLodgmentDao.selectRoomInfo(lodgmentNo); // 객실 정보 조회

		int numPerPage = 5; // 한 페이지당 게시물 수
		int pageNaviSize = 5; // 페이지네비 길이
		int totalCount = sellerLodgmentDao.totalCount(); // 전체 리뷰 수
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);

//		List<LodgmentReviewDTO> review = sellerLodgmentDao.selectLodgmentReview(lodgmentNo,pi); // 호텔 리뷰 조회
		List<LodgmentReviewDTO> review = sellerLodgmentDao.selectLodgmentReview(lodgmentNo, pi.getStart(), pi.getEnd()); // 호텔
																															// 리뷰
																															// 조회
		System.out.println(review);

		map.put("lodgment", ls);
		map.put("list", list);
		map.put("review", review);
		map.put("pi", pi);

		return map;
	}

	// 객실 상세
	public Map selectRoomInfo(int lodgmentNo, int roomNo) {
		Map<String, Object> map = new HashMap<String, Object>();
		LodgmentStorageDTO ls = sellerLodgmentDao.selectOneLodgment(lodgmentNo); // 호텔 정보 출력 (호텔 이름, 체크인, 체크 아웃, 주소 들고
																					// 오기)
		RoomDTO rd = sellerLodgmentDao.selectRoomViewInfo(roomNo);
		map.put("lodgment", ls);
		map.put("room", rd);
		return map;
	}

	// 객실 등록(객실 정보, 파일, 해시태그 동시 처리)
	@Transactional
	public int insertRoom(RoomDTO room, List<RoomFileDTO> roomFileList) {
		int result = sellerLodgmentDao.insertRoom(room);
		System.out.println(room);
		for (RoomFileDTO roomFile : roomFileList) {
			roomFile.setRoomNo(room.getRoomNo());
			result += sellerLodgmentDao.insertRoomFile(roomFile);
		}
		// 체크가 null 값이 아닐 때만 (해시태그가 비어있을 수도 있으니까...)
		if (room.getServiceTag() != null) {
			for (int serviceTagNo : room.getServiceTag()) {
				RoomServiceTagDTO rst = new RoomServiceTagDTO();
				rst.setRoomNo(room.getRoomNo());
				rst.setServiceTagNo(serviceTagNo); // 태그 값을 설정

				result += sellerLodgmentDao.insertServiceTag(rst); // 서비스 태그 DB에 삽입
			}
		}

		return result;
	}
	


	// 객실 수정
	@Transactional
	public List<RoomFileDTO> updateRoom(RoomDTO room, List<RoomFileDTO> roomFileList) {
		// 파일을 제외한 객실 정보 update
		int result = sellerLodgmentDao.updateRoom(room);
		// 체크가 null 값이 아닐 때만 (해시태그가 비어있을 수도 있으니까...)
		if (room.getServiceTag() != null) {
			int r = sellerLodgmentDao.delAllServiceTag(room.getRoomNo()); // 서비스 태그 모두 삭제
			int res=0;
			if(r>0) { // 서비스 삭제에 성공하면 insert
				for (int serviceTagNo : room.getServiceTag()) {
					RoomServiceTagDTO rst = new RoomServiceTagDTO();
					rst.setRoomNo(room.getRoomNo());
					rst.setServiceTagNo(serviceTagNo); // 태그 값을 설정

					res += sellerLodgmentDao.insertServiceTag(rst); // 서비스 태그 DB에 삽입
				}
			}
		}
		if (result > 0) {
			// 삭제할 파일이 있으면 조회 후 삭제
			List<RoomFileDTO> delFileList = new ArrayList<RoomFileDTO>();
			if (room.getDelRoomFileNo() != null) {
				delFileList = sellerLodgmentDao.selectRoomFile(room.getDelRoomFileNo());
                result += sellerLodgmentDao.deleteRoomFile(room.getDelRoomFileNo());
			}
            // 새 첨부파일이 있으면 새 첨부파일을 insert하는 작업
            for(RoomFileDTO roomFile : roomFileList){
                result += sellerLodgmentDao.insertRoomFile(roomFile);
            }
            System.out.println("3 : "+room.getDelRoomFileNo());
            //삭제한 파일이 없으면 1 + boardFileList.size 만 한거고 삭제한 파일이 있으면 그 삭제한 파일의 길이까지 같이 더한 거임
            int updateTotal = room.getDelRoomFileNo() == null ? 1 + roomFileList.size() : 1 + roomFileList.size() + room.getDelRoomFileNo().length;
            System.out.println(result);
            System.out.println(updateTotal);
            if(result == updateTotal){
                return delFileList;
            }
		}
		return null;
	}

	// 판매자 정산
	public List<StmInfoDTO> selectStmInfo(StmInfoDTO st) {
		List<StmInfoDTO> ls = sellerLodgmentDao.selectStmInfo(st);
		return ls;
	}

	// 판매자 문의 글 리스트 조회
	public List<StmInfoDTO> selectStmSearchInfo(StmInfoDTO st) {
		List<StmInfoDTO> ls = sellerLodgmentDao.selectStmInfo(st);
		return ls;
	}

//	public List<InquiryDTO> selectInqList(String token) {
//		LoginSellerDTO loginSeller = jwtUtil.sellerCheckToken(token);
//		List<InquiryDTO> ls = sellerLodgmentDao.selectInqList(loginSeller.getSellerNo());
//		return ls;
//	}

	// 판매자 문의 글 리스트 조회
	public List<InquiryDTO> selectInqList(int loginNo) {
		List<InquiryDTO> ls = sellerLodgmentDao.selectInqList(loginNo);
		return ls;
	}

	@Transactional
	// 형묵 seller-회원가입
	public int insertSeller(SellerDTO seller) {
		String encPw = encoder.encode(seller.getSellerPw());
		seller.setSellerPw(encPw);
		int result = sellerDao.insertSeller(seller);
		return result;
	}

	// 형묵 seller- id 중복체크
	public int checkSellerId(String businessNo) {
		int result = sellerDao.checkSellerId(businessNo);
		return result;
	}

	// 형묵 seller-login 완
	public LoginSellerDTO login(SellerDTO seller) {
		SellerDTO s = sellerDao.selectLoginSeller(seller.getBusinessNo());
		System.out.println(s);
		if (s != null && encoder.matches(seller.getSellerPw(), s.getSellerPw())) {
			String accessToken = sellerJwtUtils.createAccessToken(s.getSellerNo());
			String refreshToken = sellerJwtUtils.createRefreshToken(s.getSellerNo());
			LoginSellerDTO loginSeller = new LoginSellerDTO();
			loginSeller.setAccessToken(accessToken);
			loginSeller.setRefreshToken(refreshToken);
			loginSeller.setSellerNo(s.getSellerNo());
			loginSeller.setBusinessName(s.getBusinessName());
			return loginSeller;
		}
		return null;
	}

	// 판매자 문의 글 상세
	public InquiryDTO selectInqView(int inqNo) {
		InquiryDTO id = sellerLodgmentDao.selectInqView(inqNo);
		return id;
	}

	// seller refresh 형묵
	public LoginSellerDTO refresh(String token) {
		try {
			LoginSellerDTO loginSeller = sellerJwtUtils.checkToken(token);
			String accessToken = sellerJwtUtils.createAccessToken(loginSeller.getSellerNo());
			String refreshToken = sellerJwtUtils.createRefreshToken(loginSeller.getSellerNo());
			loginSeller.setAccessToken(accessToken);
			loginSeller.setRefreshToken(refreshToken);
			SellerDTO s = sellerDao.selectOneSeller(loginSeller.getSellerNo());
			loginSeller.setBusinessName(s.getBusinessName());
			return loginSeller;
		} catch (Exception e) {

		}
		return null;

	}

	// 예약 리스트 조회
//	public List selectReserveList(String token) {
//		LoginSellerDTO loginSeller = jwtUtil.sellerCheckToken(token);
//		List list = sellerLodgmentDao.selectReserve(loginSeller.getSellerNo());
//		System.out.println("list"+list);
//		return list;
//	}
	public List selectReserveList(int loginNo) {
		List list = sellerLodgmentDao.selectReserve(loginNo);
		System.out.println("list" + list);
		return list;
	}

	// 예약 상세 조회
	public BookingInfoDTO bookInfo(int bookNo) {
		BookingInfoDTO bid = sellerLodgmentDao.bookInfo(bookNo);
		return bid;
	}

	// 호텔 및 객실 삭제 (찐 삭제는 아님 1에서 0으로 전환), 호텔 삭제하면 그 호텔에 해당된 객실도 0으로 전환
	@Transactional
	public int delUpLodgment(int lodgmentNo) {
		// 지우려는 호텔의 객실까지 모두 0으로 전환 update
		int result = sellerLodgmentDao.delUpLodgmentRoom(lodgmentNo);
		if (result > 0) {
			result += sellerLodgmentDao.delUpLodgment(lodgmentNo);
			return result;
		}
		return 0;
	}

	// 객실만 삭제 (1에서 0으로 전환)
	@Transactional
	public int delUpRoom(int roomNo) {
		int result = sellerLodgmentDao.delUpRoom(roomNo);
		return result;
	}

	// 숙소 리뷰 댓글 작성 (한 테이블에 묶여있어서 update 사용함)
	@Transactional
	public int updateComment(LodgmentReviewDTO ld) {
		int result = sellerLodgmentDao.updatecomment(ld);
		return result;
	}




}