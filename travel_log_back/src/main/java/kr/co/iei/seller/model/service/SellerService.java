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

import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.dao.SellerDao;
import kr.co.iei.seller.model.dto.BookingInfoDTO;
import kr.co.iei.seller.model.dto.InsertRoomDTO;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.seller.model.dto.RoomFileDTO;
import kr.co.iei.seller.model.dto.RoomServiceTagDTO;
import kr.co.iei.seller.model.dto.SellerDTO;
import kr.co.iei.seller.model.dto.ServiceTagDTO;
import kr.co.iei.seller.model.dto.StmInfoDTO;
import kr.co.iei.util.FileUtils;
import kr.co.iei.util.SellerJwtUtils;

@Service
public class SellerService {
	@Autowired
	private SellerDao sellerDao;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Autowired
	private SellerJwtUtils sellerJwtUtils;
	
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	// 메인(등록한 호텔 정보)
	public List selectLodgmentList(int sellerNo) {
		List list = sellerDao.selectLodgmentList(sellerNo);
		return list;
	}

	// 기존 숙소 검색
	public List selectXlsxHotelInfo(String searchInfo) {
		List list = sellerDao.selectXlsxHotelInfo(searchInfo);
		return list;
	}
	
	// 판매자 정보 조회
	public MemberDTO selectOneSeller(int sellerNo) {
		//		SellerDTO로 바꿔야함
		return null;
	}

	// 호텔 정보 출력
	public LodgmentStorageDTO selectOneLodgment(int lodgmentNo) {
		LodgmentStorageDTO ls = sellerDao.selectOneLodgment(lodgmentNo);
		return ls;
	}

	// 호텔 등록
	@Transactional
	public int insertLodgment(LodgmentStorageDTO ls) {
		LodgmentStorageDTO lg = sellerDao.selectOneLodgment(ls.getLodgmentNo());
		if(lg == null) {
			int result = sellerDao.insertLodgment(ls);
			int rs = sellerDao.deleteLodgment(ls.getLodgmentNo());
			return result;
		}
		return 0;
	}

	// 호텔 상세 (호텔 + 객실 상세)
	public Map selectHotelInfo(int lodgmentNo) {
		Map<String, Object> map = new HashMap<String, Object>();

		LodgmentStorageDTO ls = sellerDao.selectOneLodgment(lodgmentNo); // 호텔 정보 출력
		List<RoomDTO> list = sellerDao.selectRoomInfo(lodgmentNo); // 객실 정보 출력
		System.out.println(list);
	
		map.put("lodgment",ls);
		map.put("list", list);
		
		
		return map;
	}

	// 객실 상세
		public Map selectRoomInfo(int roomNo) {
			Map<String, Object> map = new HashMap<String, Object>();
			
			return null;
		}
	
//		// 객실 등록
		@PostMapping(value="/insertRoom")
		public ResponseEntity<Boolean> insertRoom(@ModelAttribute InsertRoomDTO room, @ModelAttribute MultipartFile[] roomFile){
			System.out.println(room);
			List<RoomFileDTO> roomFileList = new ArrayList<RoomFileDTO>();
			if(roomFile != null) {
				String savepath = root+"/seller/room/";
				for(MultipartFile file : roomFile) {
					RoomFileDTO fileDTO = new RoomFileDTO();
					String filename = file.getOriginalFilename();
					String filepath = fileUtil.upload(savepath, file);
					fileDTO.setRoomImg(filepath);
					roomFileList.add(fileDTO);
				}
			}
			int result = SellerService.insertRoom(room, roomFileList);
			System.out.println(result);
			return ResponseEntity.ok(result!=0+roomFileList.size());
		}

	public BookingInfoDTO bookInfo(int bookNo) {
		BookingInfoDTO bid = sellerDao.bookInfo(bookNo);
		return bid;
	}

	public List<StmInfoDTO> selectStmInfo(StmInfoDTO st) {
		List<StmInfoDTO> ls = sellerDao.selectStmInfo(st);
		return ls;
	}

	public List<StmInfoDTO> selectStmSearchInfo(StmInfoDTO st) {
		List<StmInfoDTO> ls = sellerDao.selectStmInfo(st);
		return ls;
	}
	//형묵 seller-회원가입
	public int insertSeller(SellerDTO seller) {
		String encPw = encoder.encode(seller.getSellerPw());
		seller.setSellerPw(encPw);
		int result = sellerDao.insertSeller(seller);
		return result;
	}

	


}
