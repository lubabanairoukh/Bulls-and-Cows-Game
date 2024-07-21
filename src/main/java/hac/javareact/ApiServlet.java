
package hac.javareact;


import com.google.gson.Gson;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

import java.util.List;




/* You can delete this comment before submission - it's only here to help you get started.
Your servlet should be available at "/java_react_war/api/highscores"
assuming you don't modify the application's context path (/java_react_war).
on the client side, you can send request to the servlet using:
fetch("/java_react_war/api/highscores")
*/

@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {
    private final Gson gson = new Gson();


    /**
     * Handles a GET request for this servlet -send HighScores data r=to react-client
     * <br/>
     * @param request data of the incoming request from the client
     * @param response provides tools to handle the compilation of the response and sending it to the client
     * @throws IOException may be thrown if sending data to the client fails for some reason.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        String path = getServletContext().getRealPath(".");
        response.setHeader("Access-Control-Allow-Origin", "*");
        try {
            List<HighScore> highScores=getHighScores(path);
            String json = new Gson().toJson(highScores);
            out.print(json);
            response.setStatus(200);
        } catch (IOException e) {
            response.setStatus(400);
            String error = new Gson().toJson(e.getMessage());
            out.print(error);
        } finally {
            out.flush();
            out.close();
        }

    }
    /**
     * Retrieves the high scores from the specified file path and returns a list of the top 5 high scores.
     * @param path The file path to the high scores file.
     * @return A list of the top 5 high scores.
     * @throws IOException If there is an error reading from the high scores file.
     */
    private synchronized List<HighScore> getHighScores(String path) throws IOException{
        try {
            HighScoreFileHandler.getInstance().readFromFile(path);
            List<HighScore> scores = HighScoreFileHandler.getInstance().getHighScores();
            return scores.subList(0, Math.min(scores.size(), 5));
        }catch (IOException e) {
            throw new IOException(e.getMessage());
        }
    }


    /**
     * Handles a post request for this servlet -recieve Highscore data to save them in the file
     * <br/>
     * @param request data of the incoming request from the client
     * @param response provides tools to handle the compilation of the response and sending it to the client
     * @throws IOException may be thrown if sending data to the client fails for some reason.
     */
        @Override
    protected void doPost(HttpServletRequest request,HttpServletResponse response)throws IOException{
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"))) {

            String requestBody = reader.lines().reduce("", (s1, s2) -> s1 + s2);

            HighScore highScoreData = gson.fromJson(requestBody, HighScore.class);

            addHighScore(highScoreData);

            response.setStatus(200);



        } catch (IOException e) {
            response.setStatus(400);

        }
    }
    /**
     * This method adds a new high score entry to the file.
     * @param highScoreData the HighScore object representing the new high score to be added.
     * @throws IOException if there is an error accessing or writing to the high score file.
     */
    private synchronized void addHighScore( HighScore highScoreData)throws IOException{
        String servletPath = getServletContext().getRealPath(".");
        try {
            HighScoreFileHandler.getInstance().addHighScore(highScoreData, servletPath);
        }catch (IOException e){
            throw new IOException(e.getMessage());
        }
    }
    @Override
    public void init() {
    }

    @Override
    public void destroy() {
    }
}
