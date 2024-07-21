package hac.javareact;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.Paths;


public class HighScoreFileHandler {

    private static final List<HighScore> highScores = new ArrayList<HighScore>();
    private static final HighScoreFileHandler instance = new HighScoreFileHandler();
    private static final String FILENAME = "scores.dat";

    private HighScoreFileHandler() {
    }

    /**
     * Defines a new file at the specified path, with the default file name.
     * @param path the path to create the file at
     * @throws IOException if an error occurs while creating the file
     */
    private synchronized void defineFile(String path) throws IOException {
        try (FileOutputStream fileOutputStream = new FileOutputStream(path);
             ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream)) {
        } catch (IOException e) {
            throw new IOException("Cannot create " + FILENAME);
        }
    }

    /**
     * Adds the current list of high scores to a file at the given servlet path.
     *
     * @param servletPath the path to the servlet context where the file will be saved
     * @throws IOException if an I/O error occurs while writing to the file
     */

    private synchronized void addToFile(String servletPath) throws IOException {
        String fullPathString = Paths.get(servletPath, FILENAME).toString();
        //String fullPathString = fullPath.toString();

        try (ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream(fullPathString))) {

            highScores.forEach(score -> {
                try {
                    objectOutputStream.writeObject(score);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });

        } catch (IOException e) {
            throw new IOException("Cannot write to " + FILENAME);
        }
    }


    public static HighScoreFileHandler getInstance() {
        return instance;
    }
    public List<HighScore> getHighScores() {
        return highScores;
    }

    /**
     * Reads high score data from a file at the specified servlet path and populates the highScores list.
     * If the file does not exist, creates a new file.
     * @param servletPath a String representing the servlet path where the file is located
     * @throws IOException if there is an error reading the file or if the file cannot be created
     */
    public synchronized void readFromFile(String servletPath) throws IOException {
        String fullPathString = Paths.get(servletPath, FILENAME).toString();
        try (ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream(fullPathString))) {
            highScores.clear(); // Clear the highScores list to prepare for new data
            // Read objects from the input stream and add them to the highScores list
            while (true) {
                HighScore score = (HighScore) objectInputStream.readObject();
                highScores.add(score);
            }
        } catch (FileNotFoundException e) {
            this.defineFile(servletPath);
        } catch (EOFException e) {
            // End of file reached, do nothing
        } catch (ClassNotFoundException | IOException e) {
            throw new IOException("Cannot read " + FILENAME);
        }
    }

    /**
     * Adds a new high score to the list of high scores, or updates an existing high score if the new score is higher.
     * The high scores list is sorted in descending order based on score, and only the top 5 scores are kept.
     * The updated list is written to the file system.
     *
     * @param newScore     the new high score to be added or updated
     * @param servletPath  the file path to the servlet context where the high scores file is located
     * @throws IOException if there is an error reading from or writing to the high scores file
     */
    public synchronized void addHighScore(HighScore newScore,String servletPath) throws IOException{
        boolean found = false;
        for (int i = 0; i < highScores.size(); i++) {
            HighScore existingScore = highScores.get(i);
            if (existingScore.getName().equals(newScore.getName())) {
                found = true;
                if (existingScore.getScore() < newScore.getScore()) {
                    // Replace the existing score with the new score
                    highScores.set(i, newScore);
                }
                break;
            } else if (existingScore.getScore() < newScore.getScore()) {
                // Insert the new score before the existing score
                highScores.add(i, newScore);
                found = true;
                break;
            }
        }
        if (!found) {
            // The new score has the lowest score in the list, so add it at the end
            highScores.add(newScore);
        }

        addToFile(servletPath);

    }

    public void printHighScores() {
        for (int i = 0; i < highScores.size(); i++) {
            HighScore score = highScores.get(i);
            System.out.println((i + 1) + ". " + score.getName() + ": " + score.getScore());
        }
    }

}
