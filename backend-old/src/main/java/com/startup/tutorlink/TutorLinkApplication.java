package com.startup.tutorlink;

import com.startup.tutorlink.entity.*;
import com.startup.tutorlink.entity.auth.ERole;
import com.startup.tutorlink.entity.auth.Role;
import com.startup.tutorlink.repository.*;
import com.startup.tutorlink.repository.auth.RoleRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.*;

@SpringBootApplication
public class TutorLinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(TutorLinkApplication.class, args);
	}

	@Bean
	ApplicationRunner init(
		UserRepository userRepository,
		PasswordEncoder encoder,
		RoleRepository roleRepository,
		PaymentStatusRepository paymentStatusRepository,
		CollegeRepository collegeRepository,
		DepartmentRepository departmentRepository,
		MajorRepository majorRepository,
		TagRepository tagRepository
	) {
		return args -> {
			Object[][] data;
			// ------------Add User ROLE ---------
			roleRepository.save(new Role(ERole.ROLE_MEMBER));
			roleRepository.save(new Role(ERole.ROLE_ADMIN));
			// ------------Member-----------------
			data = new Object[][]{{"Alice", "0882223331", "Nattawat@gmail.com", "1234", "Alice", ERole.ROLE_ADMIN, "Alicelis", "Momoya"},
					{"Bob", "0881112223", "ToeiKanta@gmail.com", "1234", "Bob", ERole.ROLE_MEMBER, "Bobberbee", "Boomboom"}};
			for (int i = 0; i < data.length; i++) {
				User user = new User(data[i][4].toString().toLowerCase(),
						data[i][2].toString(),
						encoder.encode(data[i][3].toString()),
						data[i][1].toString(),
						data[i][6].toString(),
						data[i][7].toString()
				);
				Set<Role> roles = new HashSet<>();
				if(i == 0){
					roles.add(roleRepository.findByName(ERole.ROLE_MEMBER).orElseThrow(() -> new RuntimeException("Error: Role is not found.")));
					user.setUserImg("https://image.shutterstock.com/mosaic_250/2936380/613759379/stock-photo-happy-cheerful-young-woman-wearing-her-red-hair-in-bun-rejoicing-at-positive-news-or-birthday-gift-613759379.jpg");
					user.setShortDetail("นักศึกษา ปี 3 อากาศยาน");
					roles.add(roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found.")));
				}else{
					user.setUserImg("https://www.stockvault.net//data/2011/10/30/127712/thumb16.jpg");
					user.setShortDetail("อาจารย์ภาควิศวกรรมคอม");
					roles.add(roleRepository.findByName(ERole.ROLE_MEMBER).orElseThrow(() -> new RuntimeException("Error: Role is not found.")));
				}

				user.setRoles(roles);
				user = userRepository.save(user);

				System.out.printf("\n------------Add Member%d--------------\n", i + 1);
				System.out.println(user);
				System.out.println("-------------------------------------------");
			}
			//------------- Add Payment Status ---------
			paymentStatusRepository.save(new PaymentStatus(EPaymentStatus.APPROVE));
			paymentStatusRepository.save(new PaymentStatus(EPaymentStatus.PENDING));
			paymentStatusRepository.save(new PaymentStatus(EPaymentStatus.REJECT));
			//------------- Add College Name ---------
			College col = collegeRepository.save(new College("มหาวิทยาลัยเทคโนโลยีสุรนารี"));
			//-------------- Add Major Name ----------
			Major major = majorRepository.save(new Major("วิศวกรรมศาสตร์",col));
			majorRepository.save(new Major("แพทยศาสตร์",col));
			majorRepository.save(new Major("การเกษคร",col));
			majorRepository.save(new Major("เทคโนโลยีสารสนเทศ",col));
			//-------------- Add Department Name ----------
			departmentRepository.save(new Department("วิศวกรรมคอมพิวเตอร์",major));
			departmentRepository.save(new Department("วิศวกรรมอากาศยาน",major));
			departmentRepository.save(new Department("วิศวกรรมเคมี",major));
			//-------------- Add Tag ----------------------
			tagRepository.save(new Tag("แคลคูลัส 2"));
			tagRepository.save(new Tag("ปี 1"));
			tagRepository.save(new Tag("มทส"));
		};
	}

	// Fix the CORS errors
	@Bean
	public FilterRegistrationBean<CorsFilter> simpleCorsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		// *** URL below needs to match the Vue client URL and port ***
		config.setAllowedOrigins(Collections.singletonList("*"));
		config.setAllowedMethods(Collections.singletonList("*"));
		config.setAllowedHeaders(Collections.singletonList("*"));
		source.registerCorsConfiguration("/**", config);
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return bean;
	}
}
