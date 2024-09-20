package kr.co.iei.faq.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.faq.model.dto.FaqDTO;

@Mapper
public interface FaqDao {

	List selectFaqList(String faqType);

	FaqDTO selectFaq(int faqNo);

	int insertFaq(FaqDTO faq);

	int updateFaq(FaqDTO faq);

	int deleteFaq(int faqNo);

	List selectFaqTypeList();

	String[] selectFaqCategory();

}
