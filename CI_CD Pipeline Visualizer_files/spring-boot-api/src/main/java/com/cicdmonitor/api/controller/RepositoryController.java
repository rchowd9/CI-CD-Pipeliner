package  com.cicdmonitor.api.controller;

import com.cicdmonitor.api.service.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/repositories")
@CrossOrigin(origins = "*")
public class RepositoryController {
    
    @Autowired
    private RepositoryService repositoryService;
    
    @PostMapping("/sync")
    public ResponseEntity<Map<String, Object>> syncRepository(@RequestBody Map<String, String> request) {
        String repoUrl = request.get("repoUrl");
        try {
            Map<String, Object> result = repositoryService.syncWithGitHub(repoUrl);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
 