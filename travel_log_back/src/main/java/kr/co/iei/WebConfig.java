package kr.co.iei;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class WebConfig implements WebMvcConfigurer{
	@Value("${file.root}")
	private String root;
	
	@Bean
	public BCryptPasswordEncoder bcrypt() {
		return new BCryptPasswordEncoder();
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**").addResourceLocations("classpath:/templates/","classpath:/static/");
		
		// 판매자 - 숙소 이미지
		registry.addResourceHandler("/seller/lodgment/*")
				.addResourceLocations("file:///"+root+"/seller/lodgment/");
		
		// 객실 이미지
		registry.addResourceHandler("/seller/room/*")
				.addResourceLocations("file:///"+root+"/seller/room/");
		//썸네일		
		registry.addResourceHandler("/board/thumb/**")
				.addResourceLocations("file:///"+root+"/board/thumb/");

		// 1 대 1 문의 사진
		registry.addResourceHandler("/inq/inquiry/**")
				.addResourceLocations("file:///"+root+"/inq/inquiry/");

				
		//bard 첨부파일
				registry.addResourceHandler("/board/*")
				.addResourceLocations("file:///"+root+"/board/");
				
		//member 프로필사진
				registry
				.addResourceHandler("/member/profile/**")
				.addResourceLocations("file:///"+root+"/member/profile/");
		
		//member 프로필사진
				registry
				.addResourceHandler("/review/**")
				.addResourceLocations("file:///"+root+"/review/");	
				
						
	}
	
}
