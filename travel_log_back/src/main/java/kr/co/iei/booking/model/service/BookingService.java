package kr.co.iei.booking.model.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import kr.co.iei.booking.model.dao.BookingDao;
import kr.co.iei.booking.model.dto.BookingCancelDTO;
import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.member.model.dao.MemberDao;

@Service
public class BookingService {
	@Autowired
	private BookingDao bookingDao;
	@Autowired
	private MemberDao memberDao;
	
	@Transactional
	public int insertBooking(BookingDTO bookingInfo) {
		String memberId = memberDao.getMemberId(bookingInfo.getMemberNo());
		//System.out.println(memberId);
		bookingInfo.setMemberId(memberId);
		int result = bookingDao.insertBooking(bookingInfo);
		return bookingInfo.getBookNo();
	}

	public BookingDTO getBookingInfo(int bookNo) {
		BookingDTO bookingInfo = bookingDao.getBookingInfo(bookNo);
		return bookingInfo;
	}


	public String getPortoneimpuid(BookingCancelDTO cancelData) {
		String portoneimpuid = bookingDao.getPortoneimpuid(cancelData);
		System.out.println("portoneimpuid : "+cancelData);
		System.out.println("portoneimpuid : "+portoneimpuid);
	

		return portoneimpuid;
	}
	
	
	

	//토큰 발행 
	public String getAccessToken() throws IOException {
		String apiKey = "4628216873375428";
		String secretKey ="CG5ZPZVJkSIPpP29OEkl9rhQsKj6WpmHCsXuTS5OyEuKp856zlZgYwEAZTKVvoKj6jxepe9hNVtIBjSf";
	    URL url = new URL("https://api.iamport.kr/users/getToken");
	    HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();

	    // 요청 방식을 Post 메서드로 설정
	    conn.setRequestMethod("POST");

	    // 요청의 Content-Type과 Accept 헤더 설정
	    conn.setRequestProperty("Content-Type", "application/json");
	    conn.setRequestProperty("Accept", "application/json");

	    // 해당 연결을 출력 스트림(요청)으로 사용
	    conn.setDoOutput(true);

	    // JSON 객체에 해당 API가 필요로하는 데이터 추가.
	    JSONObject json = new JSONObject();
	    json.put("imp_key", apiKey);
	    json.put("imp_secret", secretKey);

	    // 출력 스트림으로 해당 conn에 요청
	    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
	    bw.write(json.toString());    // json 객체를 문자열 형태로 HTTP 요청 본문에 추가
	    bw.flush();                   // BufferedWriter 비우기
	    bw.close();                   // BufferedWriter 종료

	    // 입력 스트림으로 conn 요청에 대한 응답 반환
	    BufferedReader br = new BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
	    Gson gson = new Gson();   // 응답 데이터를 자바 객체로 변환
	    String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();
	    String accessToken = gson.fromJson(response, Map.class).get("access_token").toString();
	    br.close();   // BufferedReader 종료

	    conn.disconnect();   // 연결 종료

	    return accessToken;
	}

	
	//환불
		public void refundRequest(String portoneimpuid, String accessToken) throws IOException {

		    URL url = new URL("https://api.iamport.kr/payments/cancel");
		    HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();

		    // 요청 방식을 POST로 설정
		    conn.setRequestMethod("POST");

		    // 요청의 Content-Type, Accept, Authorization 헤더 설정
		    conn.setRequestProperty("Content-type", "application/json");
		    conn.setRequestProperty("Accept", "application/json");
		    conn.setRequestProperty("Authorization",accessToken);

		    // 해당 연결을 출력 스트림(요청)으로 사용
		    conn.setDoOutput(true);

		    // JSON 객체에 해당 API가 필요로하는 데이터 추가.
		    JsonObject json = new JsonObject();
		    json.addProperty("merchant_uid", portoneimpuid);
		    json.addProperty("reason", "테스트 환불요청");

		    // 출력 스트림으로 해당 conn에 요청
		    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
		    bw.write(json.toString());
		    bw.flush();
		    bw.close();

		    // 입력 스트림으로 conn 요청에 대한 응답 반환
		    BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		    br.close();
		    conn.disconnect();

		}
		
		//환불
		@Transactional
		public int bookingCancelUpdate(BookingCancelDTO cancelData) {
			int result =bookingDao.updateBooking(cancelData);
			if(result == 1) {
				result += bookingDao.insertBookCancel(cancelData);
			}
			return result;
		}
}
