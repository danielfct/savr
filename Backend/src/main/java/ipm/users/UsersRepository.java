package ipm.users;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface UsersRepository extends CrudRepository<SavrUser, Long> {

    List<SavrUser> findByEmail(String email);

}
