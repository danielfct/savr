package ipm;

import ipm.users.SavrUser;
import ipm.users.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader {

    @Bean
    CommandLineRunner initDatabase(UsersRepository users) {
        return args -> {
            SavrUser user = new SavrUser();
            user.setFirstName("System");
            user.setLastName("Admin");
            user.setEmail("admin");
            user.setPassword("admin");
            users.save(user);
        };
    }
}
