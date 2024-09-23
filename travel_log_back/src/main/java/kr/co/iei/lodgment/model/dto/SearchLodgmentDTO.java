package kr.co.iei.lodgment.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SearchLodgmentDTO {
	private String lodgmnet;
	private int guest;
	private Date startDate;
	private Date endDate;
}
